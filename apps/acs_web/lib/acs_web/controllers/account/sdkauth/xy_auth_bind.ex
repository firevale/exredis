defmodule AcsWeb.XYAuthBind do
  use     AcsWeb, :controller
  require SDKXY
  alias   Acs.Apps

  def bind(%Plug.Conn{private: %{acs_app: %App{} = app,
                                 acs_device_id: device_id,
                                 acs_platform: platform}} = conn, 
           %{"xy_access_token" => xy_access_token,
             "xy_user_id" => xy_user_id}) do
              
    with %AppSdkBinding{binding: %{"app_id" => xy_app_id}} <- Apps.get_app_sdk_binding(app.id, "xy"),
         true <- SDKXY.validate_session(xy_app_id, xy_access_token, xy_user_id),
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: "xy", 
           sdk_user_id: xy_user_id, 
           email: nil,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding:  %{xy: %{access_token: xy_access_token, user_id: xy_user_id}}
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
        sdk: "xy",
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end