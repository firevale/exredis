defmodule AcsWeb.WechatController do
  use     AcsWeb, :controller
  require SDKWechat

  plug :fetch_app_id
  plug :fetch_app
  plug :fetch_access_token

  # prepay
  def prepay(%Plug.Conn{private: %{acs_app: %App{
                        sdk_bindings: %{wechat: wechat_info}}}} = conn,
             %{"payment_order_id" => order_id} = _params) do

    notify_url = "#{url(conn)}/api/pay/wechat/notify"

    # handling request via nginx reverse proxy
    ip_address = case Plug.Conn.get_req_header(conn, "x-forwarded-for") do
      [val | _] -> val
      _ -> conn.remote_ip |> :inet_parse.ntoa |> to_string
    end

    case SDKWechat.prepay(order_id, wechat_info, ip_address, notify_url) do
      {:ok, partnerid, prepay_id, noncestr, timestamp, sign} ->
        conn |> json(%{
          success: true,
          partnerid: partnerid,
          prepay_id: prepay_id,
          noncestr: noncestr,
          timestamp: timestamp,
          sign: sign
        })
      _ ->
        conn |> json(%{success: false, message: "wechat get prepay_id fail"})
    end
  end
  def prepay(conn, _params) do
    d "req : #{inspect conn.private.acs_app.sdk_bindings, pretty: true}"
    conn |> json(%{success: false, message: "invalid request params"})
  end

  # mallprepay
  def mallprepay(%Plug.Conn{private: %{acs_app: %App{
                        sdk_bindings: %{wechat: wechat_info}}}} = conn,
             %{"payment_order_id" => order_id} = _params) do

    notify_url = "#{url(conn)}/api/pay/wechat/mallnotify"

    # handling request via nginx reverse proxy
    ip_address = case Plug.Conn.get_req_header(conn, "x-forwarded-for") do
      [val | _] -> val
      _ -> conn.remote_ip |> :inet_parse.ntoa |> to_string
    end

    case SDKWechat.mallprepay(order_id, wechat_info, ip_address, notify_url) do
      {:ok, partnerid, prepay_id, noncestr, timestamp, sign} ->
        conn |> json(%{
          success: true,
          partnerid: partnerid,
          prepay_id: prepay_id,
          noncestr: noncestr,
          timestamp: timestamp,
          sign: sign
        })
      _ ->
        conn |> json(%{success: false, message: "wechat get prepay_id fail"})
    end
  end
  def mallprepay(conn, _params) do
    d "req : #{inspect conn.private, pretty: true}"
    conn |> json(%{success: false, message: "invalid request params"})
  end

  # notify
  def notify(conn, _params) do
    with {:ok, body, _} <- read_body(conn),
         notify_params <- XmlUtils.convert(body),
         "SUCCESS" <- notify_params[:return_code],
         %AppOrder{} = order <- Repo.get(AppOrder, notify_params[:out_trade_no]),
         {:ok, sign_key} <- get_wechat_sign_key(order),
         :ok <- SDKWechat.check_sign(notify_params, sign_key)
    do
      AppOrder.changeset(order, %{
        status: AppOrder.Status.paid(),
        paid_at: DateTime.utc_now(),
        transaction_id: "wechat." <> notify_params[:transaction_id],
        paid_channel: "wechat",
        fee: notify_params[:total_fee],
        transaction_currency: notify_params[:fee_type]
      }) |> Repo.update! |> Acs.PaymentHelper.notify_cp

      conn |> text(xml_response("SUCCESS", "OK"))
    else
      nil ->
        conn |> text(xml_response("FAIL", "order not found"))
      {:error, msg} ->
        conn |> text(xml_response("FAIL", msg))
      _ ->
        conn |> text(xml_response("FAIL", "unknown error"))
    end
  end

  # mallnotify
  def mallnotify(conn, _params) do
    with {:ok, body, _} <- read_body(conn),
         notify_params <- XmlUtils.convert(body),
         "SUCCESS" <- notify_params[:return_code],
         %MallOrder{} = order <- Repo.get(MallOrder, notify_params[:out_trade_no]),
         {:ok, sign_key} <- get_mall_wechat_sign_key(order),
         :ok <- SDKWechat.check_sign(notify_params, sign_key)
    do
      MallOrder.changeset(order, %{
        status: MallOrder.Status.paid(),
        paid_at: DateTime.utc_now(),
        transaction_id: "wechat." <> notify_params[:transaction_id],
        paid_type: "wechat",
        fee: notify_params[:total_fee],
        transaction_currency: notify_params[:fee_type]
      }) |> Repo.update!

      conn |> text(xml_response("SUCCESS", "OK"))
    else
      nil ->
        conn |> text(xml_response("FAIL", "order not found"))
      {:error, msg} ->
        conn |> text(xml_response("FAIL", msg))
      _ ->
        conn |> text(xml_response("FAIL", "unknown error"))
    end
  end

  # authlogin
  def authlogin(%Plug.Conn{private: %{acs_app_id: _app_id,
                                      acs_device_id: device_id,
                                      acs_platform: platform,
                                      acs_app: %App{sdk_bindings: %{wechat: wechat_info}} = app }} = conn,
                %{"state" => state, "code" => code}) do
    session_state = get_session(conn, :wechat_login_state)
   
    with true <- session_state == state,
        {:ok, access_token, openid} <- SDKWechat.get_auth_access_token(wechat_info, code)
        #  {:ok, _openid, nickname, _sex, _headimgurl} <- SDKWechat.get_auth_user_info(access_token, openid)
    do
      case Accounts.bind_sdk_user(%{sdk: :wechat, 
                                     app_id: app.id, 
                                     sdk_user_id: openid, 
                                     email: nil,
                                     nickname: "",
                                     device_id: device_id,
                                     mobile: nil,
                                     avatar_url: nil}) do 
        {:ok, user} -> 
          access_token = Auth.create_access_token(%{
            app_id: app.id, 
            user_id: user.id,
            device_id: device_id,
            platform: platform,
            ttl: app.token_ttl,
            binding: %{wechat: %{access_token: access_token, open_id: openid}}
          })

          conn |> json(%{
            success: true,
            access_token: access_token.id,
            expires_at: AccessToken.expired_at(access_token),
            user_id: "#{user.id}",
            user_email: user.email,
            nick_name:  user.nickname,
            is_anonymous: false,
            sdk: :wechat,
            binding: access_token.binding              
          })

        _ ->
          conn |> json(%{success: false, message: "can't bind sdk user"})
      end
    else
      false -> conn |> json(%{success: false, message: "invalid request params"})
      {:error, errmsg} -> conn |> json(%{success: false, message: errmsg})
    end

  end
  def authlogin(conn, _params) do
    d "req : #{inspect conn.private, pretty: true}"
    conn |> json(%{success: false, message: "invalid request params"})
  end

  defp get_wechat_sign_key(%AppOrder{app_id: app_id}) do
    case RedisApp.find(app_id) do
      nil -> {:error, "app not found"}
      %{sdk_bindings: %{wechat: %{sign_key: key}}} -> {:ok, key}
      _ -> {:error, "wechat configuration not found"}
    end
  end

  defp get_mall_wechat_sign_key(%MallOrder{app_id: app_id}) do
    case RedisApp.find(app_id) do
      nil -> {:error, "app not found"}
      %{sdk_bindings: %{wechat: %{sign_key: key}}} -> {:ok, key}
      _ -> {:error, "wechat configuration not found"}
    end
  end

  # xml_response
  def xml_response(code, msg) do
    """
      <xml>
        <return_code><![CDATA[#{code}]]></return_code>
        <return_msg><![CDATA[#{msg}]]></return_msg>
      </xml>
    """
  end
end
