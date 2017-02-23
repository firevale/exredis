defmodule SDKWechat do
  use     HTTPotion.Base
  use     LogAlias
  import  SweetXml
  require Utils
  
  alias Acs.Repo
  alias Acs.AppOrder
  alias Acs.RedisApp
  
  @wechat_config      Application.get_env(:acs, :wechat)
  @prepay_url         @wechat_config[:prepay_url]
  @check_url          @wechat_config[:check_url]
  @close_url          @wechat_config[:close_url]
  @refund_url         @wechat_confi[:refund_url]
  @refundquery_url    @wechat_confi[:refundquery_url]

  @config  %{
    :trade_type => "APP"
  }

  @status_paid AppOrder.Status.paid()

  def prepay(order_id, wechat_info, ip_address, notify_url) do
    
    case Repo.get(AppOrder, order_id) do 
      order = %AppOrder{} ->
        # update order info (paid channel)
        AppOrder.changeset(order, %{paid_channel: "wechat"}) |> Repo.update!
        {a,b,c,d}=ip_address

        params = %{
          :appid => wechat_info.app_id,
          :body => order.goods_name,
          :mch_id => wechat_info.partnerid,
          :nonce_str => Utils.nonce,
          :notify_url => notify_url,
          :out_trade_no => order.id,
          :spbill_create_ip => "#{a}.#{b}.#{c}.#{d}",
          :total_fee => order.price,
          :trade_type => @config[:trade_type]
        }

        req_params = params_with_sign(params,wechat_info.sign_key)

        req_data = "<xml>" <> Enum.map_join(req_params, "", fn({key, value}) -> "<#{key}>#{value}</#{key}>" end) <> "</xml>"

        response = post(@prepay_url, body: req_data)
        
        d "wechat prepay, response: #{inspect response.body, pretty: true}"
        if HTTPotion.Response.success?(response) do 
          case get_prepay_id(response.body) do
              {:ok, prepay_id} -> 
                  resign_params = re_sign(wechat_info.app_id, wechat_info.partnerid, prepay_id, wechat_info.sign_key)
                  {:ok, wechat_info.partnerid, prepay_id, resign_params[:noncestr], resign_params[:timestamp], resign_params[:sign]} 
              {:error, return_msg} ->
                  d "wechat, get_prepay_id error: #{return_msg}" 
                  {:error, return_msg}
              _ -> 
                  {:error, "wechat prepay, get_prepay_id fail"}
          end
        else
          {:error, nil}
        end

      _ -> 
        {:error, "order not found"}
    end
    
  end

  def on_check(order_id, wechat_info) do
      case Repo.get(AppOrder, order_id) do 
        order = %AppOrder{} ->

          case order.status do
            @status_paid -> 
              {:ok, "购买成功"}
            _ ->
              case check_order_status(wechat_info.app_id, wechat_info.partnerid, 
                              order_id, wechat_info.sign_key) do
                {:ok, transaction_id, total_fee, fee_type} -> 
                    AppOrder.changeset(order, %{
                      status: @status_paid,
                      paid_at: :calendar.local_time |> NaiveDateTime.from_erl!,
                      transaction_id: "wechat." <> transaction_id, 
                      paid_channel: "wechat",
                      fee: total_fee,
                      transaction_currency: fee_type
                    }) |> Repo.update!

                    #Acs.PaymentHelper.notify_cp(order)
                    {:ok, "购买成功"}
                {:error, errorstr} -> {:error, errorstr}
              end
          end
        _ -> 
          {:error, "订单不存在"}
      end
  end

  defp check_order_status(app_id, mch_id, order_id, sign_key) do
        params = %{
          :appid => app_id,
          :mch_id => mch_id,
          :nonce_str => Utils.nonce,
          :out_trade_no => order_id
        }

        req_params = params_with_sign(params,sign_key)
        req_data = "<xml>" <> Enum.map_join(req_params, "", fn({key, value}) -> "<#{key}>#{value}</#{key}>" end) <> "</xml>"

        d "wechat, check_order_status request data: #{req_data}"

        response = post(@check_url, body: req_data)
    
        d "wechat check_order_status, response: #{inspect response.body, pretty: true}"
    
        if HTTPotion.Response.success?(response) do 
          result = response.body
          return_code = result |> xpath(~x"//return_code/text()") |> to_string()
          return_msg  = result |> xpath(~x"//return_msg/text()")  |> to_string()

          case return_code do 
              "SUCCESS" -> 
                  result_code = result |> xpath(~x"//result_code/text()") |> to_string()
                  err_code = result |> xpath(~x"//err_code/text()") |> to_string()
                  err_code_des = result |> xpath(~x"//err_code_des/text()") |> to_string()
                  sign = result |> xpath(~x"//sign/text()") |> to_string()
                  
                  # check sign
                  case check_sign(result, sign_key) do
                    :ok -> 
                  
                      if result_code == "SUCCESS" do 
                        trade_state = result |> xpath(~x"//trade_state/text()") |> to_string()
                        fee_type = result |> xpath(~x"//fee_type/text()") |> to_string()
                        transaction_id = result |> xpath(~x"//transaction_id/text()") |> to_string()
                        trade_state_desc = result |> xpath(~x"//trade_state_desc/text()") |> to_string()
                        total_fee = result |> xpath(~x"//total_fee/text()") |> to_string()
                        if trade_state == "SUCCESS" do
                          {:ok, transaction_id, total_fee, fee_type}                     
                        else
                          {:error, trade_state_desc}                     
                        end
                      else
                        {:error, err_code_des}
                      end    
                  
                    _ -> {:error, "签名失败"} 
                  
                end
              
              _ -> {:error, return_msg}
          
        end
        else
          {:error, nil}
      end
 end 

def on_notify(result) do

    return_code = result |> xpath(~x"//return_code/text()") |> to_string()
    return_msg  = result |> xpath(~x"//return_msg/text()")  |> to_string()

    case return_code do 
        "SUCCESS" -> 

          sign  = result |> xpath(~x"//sign/text()")  |> to_string()
          result_code  = result |> xpath(~x"//result_code/text()")  |> to_string()
          err_code_des  = result |> xpath(~x"//err_code_des/text()")  |> to_string()
          total_fee  = result |> xpath(~x"//total_fee/text()")  |> to_string()
          fee_type  = result |> xpath(~x"//fee_type/text()")  |> to_string()
          transaction_id  = result |> xpath(~x"//transaction_id/text()")  |> to_string()
          out_trade_no  = result |> xpath(~x"//out_trade_no/text()")  |> to_string()

         case Repo.get(AppOrder, out_trade_no) do 
            order = %AppOrder{} ->
              wechat_info = RedisApp.find(order.app_id).sdk_bindings[:wechat]
              if nil == wechat_info do
                {:error, "不支持微信支付"}
              else
                # check sign
                case check_sign(result, wechat_info.sign_key) do
                  :ok ->
                    if result_code == "SUCCESS" do 

                      # update order status
                      AppOrder.changeset(order, %{
                              status: @status_paid,
                              paid_at: :calendar.local_time |> NaiveDateTime.from_erl!,
                              transaction_id: "wechat." <> transaction_id, 
                              paid_channel: "wechat",
                              fee: total_fee,
                              transaction_currency: fee_type
                            }) |> Repo.update!              

                      #Acs.PaymentHelper.notify_cp(order)
                      
                      {:ok, "OK"}

                    else
                      {:error, err_code_des}
                    end

                  _ -> 
                    {:error, "签名失败"} 
                end

              end
            _ -> 
              {:error, "订单不存在"}
          end

        _ ->
          {:error, return_msg} 
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

  def check_sign(xmlstr, sign_key) do
   :ok
  end

  def create_xml_reply(code, msg) do
    """
      <xml>
        <return_code><![CDATA[#{code}]]></return_code>
        <return_msg><![CDATA[#{msg}]]></return_msg>
      </xml>
    """
  end

  defp get_prepay_id(result) do 
     return_code = result |> xpath(~x"//return_code/text()") |> to_string()
     return_msg  = result |> xpath(~x"//return_msg/text()")  |> to_string()

     case return_code do 
        "SUCCESS" -> 
           prepay_id = result |> xpath(~x"//prepay_id/text()") |> to_string()
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

    sign = String.upcase(Utils.md5_sign("#{param_string}&key=#{sign_key}"))

    Map.put(filtered_params, :sign, sign)
  end

  defp make_param_string(%{} = params) do 
    Enum.map_join(params, "&", fn({key, value}) -> "#{key}=#{value}" end)
  end
  
end