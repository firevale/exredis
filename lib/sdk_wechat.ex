defmodule SDKWechat do
  use     Utils.LogAlias
  require Utils

  alias   Utils.Httpc
  alias   Utils.Crypto
  alias   Utils.Xml

  @wechat_config      Application.get_env(:acs, :wechat)
  @prepay_url         @wechat_config[:prepay_url]
  @auth_base_url      @wechat_config[:auth_base_url]
  @trade_type         "APP"

  def mallprepay(order, wechat_info, ip_address, notify_url) do
    params = %{
      appid: wechat_info.app_id,
      body: order.goods_name,
      mch_id: wechat_info.partnerid,
      nonce_str: Utils.nonce,
      notify_url: notify_url,
      out_trade_no: order.id,
      spbill_create_ip: ip_address,
      total_fee: order.final_price,
      trade_type: @trade_type,
    }

    req_params = params_with_sign(params, wechat_info.sign_key)

    req_data = """
      <xml>
        #{Enum.map_join(req_params, "", fn({k, v}) -> "<#{k}>#{v}</#{k}>" end)}
      </xml>
    """

    response = Httpc.post(@prepay_url, body: req_data)

    d "wechat prepay, response: #{inspect response.body, pretty: true}"
    with true <- Httpc.success?(response),
        {:ok, prepay_id} <- get_prepay_id(response.body)
    do
      resign_params = re_sign(wechat_info.app_id, wechat_info.partnerid, prepay_id, wechat_info.sign_key)
      {:ok, wechat_info.partnerid, prepay_id, resign_params[:noncestr], resign_params[:timestamp], resign_params[:sign]}
    else
      _ -> {:error, "get prepay id failed"}
    end
  end

  def prepay(order, wechat_info, ip_address, notify_url) do      
    params = %{
      appid: wechat_info.app_id,
      body: order.goods_name,
      mch_id: wechat_info.partnerid,
      nonce_str: Utils.nonce,
      notify_url: notify_url,
      out_trade_no: order.id,
      spbill_create_ip: ip_address,
      total_fee: order.price,
      trade_type: @trade_type,
    }

    req_params = params_with_sign(params, wechat_info.sign_key)

    req_data = """
      <xml>
        #{Enum.map_join(req_params, "", fn({k, v}) -> "<#{k}>#{v}</#{k}>" end)}
      </xml>
    """

    response = Httpc.post(@prepay_url, body: req_data)

    d "wechat prepay, response: #{inspect response.body, pretty: true}"
    with true <- Httpc.success?(response),
          {:ok, prepay_id} <- get_prepay_id(response.body)
    do
      resign_params = re_sign(wechat_info.app_id, wechat_info.partnerid, prepay_id, wechat_info.sign_key)
      {:ok, wechat_info.partnerid, prepay_id, resign_params[:noncestr], resign_params[:timestamp], resign_params[:sign]}
    else
      _ -> {:error, "get prepay id failed"}
    end
  end

  def re_sign(app_id, partnerid, prepay_id, sign_key) do
    # re sign
    params = %{
      appid: app_id,
      noncestr: Utils.nonce,
      package: "Sign=WXPay",
      partnerid: partnerid,
      prepayid: prepay_id,
      timestamp: Utils.unix_timestamp
    }

    params_with_sign(params, sign_key)
  end

  def check_sign(xml, sign_key) do
    their_sign = xml[:sign]

    case String.upcase(Crypto.md5_sign("#{make_param_string(xml)}&key=#{sign_key}")) do
      ^their_sign -> :ok
      _ -> {:error, "signature not match"}
    end
  end

  defp get_prepay_id(resultstr) do
    result = resultstr |> Xml.convert

    case result[:return_code] do
      "SUCCESS" ->
        {:ok, result[:prepay_id]}
      _ ->
        {:error, result[:return_msg]}
    end
  end

  defp get_auth_response(resultstr) do
    result = resultstr |> Poison.decode!

    case result["errcode"] do
      nil ->
        {:ok, result["access_token"], result["openid"]}
      _ ->
        {:error, result["errmsg"]}
    end
  end

  defp get_auth_response_user(resultstr) do
    result = resultstr |> Poison.decode!

    case result["errcode"] do
      nil ->
        {:ok, result["openid"], result["nickname"], result["sex"], result["headimgurl"]}
      _ ->
        {:error, result["errmsg"]}
    end
  end

  def params_with_sign(params, sign_key) do
    sign = "#{make_param_string(params)}&key=#{sign_key}" |> Crypto.md5_sign |> String.upcase
    Map.put(params, :sign, sign)
  end

  def get_auth_access_token(wechat_info, code) do
    url = "#{@auth_base_url}/oauth2/access_token?appid=#{wechat_info.app_id}&secret=#{wechat_info.app_secret}&code=#{code}&grant_type=authorization_code"
    response = Httpc.get(url)
    d "wechat get_auth_access_token, response: #{inspect response.body, pretty: true}"
    case Httpc.success?(response) do
      true ->
        get_auth_response(response.body)
      _ ->
        {:error, "get auth access token failed"}  
    end
  end

  def get_auth_user_info(access_token, openid) do
    url = "#{@auth_base_url}/userinfo?access_token=#{access_token}&openid=#{openid}"
    response = Httpc.get(url)
    d "wechat get_auth_user_info, url: #{url}, response: #{inspect response.body, pretty: true}"
    case Httpc.success?(response) do
      true ->
        get_auth_response_user(response.body)
      _ ->
        {:error, "get auth user info failed"}  
    end
  end

  defp make_param_string(params) do
    params |> Enum.reject(fn({k, v}) -> v == "" or is_nil(v) or k == :sign end)
           |> Enum.sort_by(fn({k, _}) -> k end)
           |> Enum.map(fn({k, v}) -> "#{k}=#{v}" end)
           |> Enum.join("&")
  end

end
