defmodule AcsWeb.XiaomiAuthBind do
  use     AcsWeb, :controller
  require Logger
  require SDKXiaomi

  def bind(%Plug.Conn{private: %{acs_app: %App{} = app,
                                 acs_device_id: device_id,
                                 acs_platform: platform}} = conn, 
           %{"xiaomi_access_token" => xiaomi_access_token,
             "xiaomi_user_id" => xiaomi_user_id}) do
              
    with %AppSdkBinding{binding: %{"app_id" => xiaomi_app_id, "app_secret" => xiaomi_app_secret}} <- Apps.get_app_sdk_binding(app.id, "xiaomi"),
         true <- SDKXiaomi.validate_session(xiaomi_app_id, xiaomi_access_token, xiaomi_user_id, xiaomi_app_secret),
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: :xiaomi, 
           sdk_user_id: xiaomi_user_id, 
           email: nil,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding:  %{xiaomi: %{access_token: xiaomi_access_token, user_id: xiaomi_user_id}}
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
        sdk: :xiaomi,
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end