defmodule AcsWeb.CoolpadAuthBind do
  use     AcsWeb, :controller
  require SDKCoolPad

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"coolpad_auth_code" => coolpad_auth_code} = _params) do

    with %AppSdkBinding{binding: %{
           "app_id" => coolpad_app_id, 
           "app_key" => coolpad_app_key}} <- Acs.Apps.get_app_sdk_binding(app.id, "coolpad"),
         %{openid: coolpad_user_id, 
           access_token: coolpad_access_token, 
           nickname: coolpad_nickname} <- SDKCoolPad.validate_session(
             coolpad_app_id, 
             coolpad_app_key, 
             coolpad_auth_code),   
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: :coolpad, 
           sdk_user_id: coolpad_user_id, 
           email: nil,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding: %{coolpad: %{access_token: coolpad_access_token, user_id: coolpad_user_id}}
         })
    do 
      conn |> json(%{
        success: true,
        access_token: access_token.id,
        expires_at: AccessToken.expired_at(access_token),
        user_id: "#{user.id}",
        user_email: user.email,
        nick_name:  user.nickname,
        is_anonymous: false,
        sdk: :coolpad,
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end

