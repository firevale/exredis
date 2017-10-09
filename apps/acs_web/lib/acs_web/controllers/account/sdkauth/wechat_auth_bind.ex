defmodule AcsWeb.WechatAuthBind do
  use     AcsWeb, :controller
  require SDKWechat

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"state" => state, "code" => code}) do
    session_state = get_session(conn, :wechat_login_state)

    with true <- session_state == state,
         %AppSdkBinding{binding: %{} = wechat_info} <- Apps.get_app_sdk_binding(app.id, "wechat"), 
         {:ok, access_token, openid} <- SDKWechat.get_auth_access_token(wechat_info.app_id, wechat_info.app_secret, code),
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: "wechat", 
           sdk_user_id: openid, 
           email: nil,
           mobile: nil, 
           nickname: nil,
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding:  %{wechat: %{access_token: access_token, openid: openid}}
         })
    do 
      conn |> json(%{
        success: true,
        access_token: access_token.id,
        expires_at: AccessToken.expired_at(access_token),
        user_id: "#{user.id}",
        user_email: user.email || "",
        nick_name:  user.nickname,
        is_anonymous: false,
        sdk: :wechat,
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "can't bind sdk user"}) 
      {:error, errmsg} -> 
        conn |> json(%{success: false, message: errmsg})
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end