defmodule SDKWechat do
  use     HTTPotion.Base
  require Logger
  import  SweetXml
  require Utils
  
  @wechat_config      Application.get_env(:acs, :wechat)
  @prepay_url         @wechat_config[:prepay_url]
  @check_url          @wechat_config[:check_url]
  @close_url          @wechat_config[:close_url]
  @refund_url         @wechat_confi[:refund_url]
  @refundquery_url    @wechat_confi[:refundquery_url]

  @config  %{
    :trade_type => "APP"
  }

  def prepay(out_trade_no, body, total_fee, app_id, mch_id, sign_key, notify_url, {a,b,c,d}=ip_address) do 
    req_id = Utils.generate_token

    params = %{
      :appid => app_id,
      :body => body,
      :mch_id => mch_id,
      :nonce_str => Utils.nonce,
      :notify_url => notify_url,
      :out_trade_no => out_trade_no,
      :spbill_create_ip => "#{a}.#{b}.#{c},#{d}",
      :total_fee => total_fee,
      :trade_type => @config[:trade_type]
    }

    req_params = params_with_sign(params,sign_key)

    req_data = "<xml>" <> Enum.map_join(req_params, "", fn({key, value}) -> "<#{key}>#{value}</#{key}>" end) <> "</xml>"

    Logger.info "wechat, request data: #{req_data}"

    response = post(@prepay_url, body: req_data)
    
    if HTTPotion.Response.success?(response) do 
      Logger.info "wechat prepay, response: #{inspect response.body, pretty: true}"
      case get_prepay_id(response.body) do
          {:ok, prepay_id} -> 
              resign_params = re_sign(app_id, mch_id, prepay_id, sign_key)
              {:ok, resign_params[:partnerid], prepay_id, resign_params[:noncestr], resign_params[:timestamp], resign_params[:sign]} 
          {:error, return_msg} ->
              Logger.info "wechat, get_prepay_id error: #{return_msg}" 
              {:error, return_msg}
          _ -> 
              {:error, "wechat prepay, get_prepay_id fail"}
      end
    else
      Logger.error "wechat prepay, response: #{inspect response, pretty: true}"
      {:error, nil}
    end
  end

  def re_sign(app_id, partnerid, prepay_id, sign_key) do
      # re sign
      params = %{
        :appid => app_id,
        :noncestr => Utils.nonce,
        :package => "Sign=WXPay",
        :partnerid => partnerid,
        :prepayid => prepay_id,
        :timestamp => Utils.unix_timestamp
      }

      params_with_sign(params,sign_key)
  end

  def get_prepay_id(result) do 
     return_code = result |> xpath(~x"//return_code/text()")
     return_msg  = result |> xpath(~x"//return_msg/text()")

     case return_code do 
        "SUCCESS" -> 
           prepay_id = result |> xpath(~x"/prepay_id/text()")
            {:ok, prepay_id}
          _ ->  {:error, return_msg}
     end
  end

  defp params_with_sign(%{} = params,sign_key) do 
    filtered_params = Enum.reduce(params, %{}, fn({key, value}, result) ->
      unless is_nil(value) or value == "" do 
        Map.put(result, key, value)
      else
        result
      end
    end)

    param_string = filtered_params |> make_param_string

    sign = Utils.md5_sign("#{param_string}#{sign_key}")

    Map.put(filtered_params, :sign, sign)
  end

  defp make_param_string(%{} = params) do 
    Enum.map_join(params, "&", fn({key, value}) -> "#{key}=#{value}" end)
  end
  
end