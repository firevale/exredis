defmodule AcsWeb.DownjoyAuthBind do
  use     AcsWeb, :controller
  require SDKDownjoy
  alias   Acs.Apps

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"dj_access_token" => downjoy_access_token,
              "dj_user_id" => downjoy_user_id}) do

    with %AppSdkBinding{binding: %{"app_id" => downjoy_app_id, "app_key" => downjoy_app_key}} <- Apps.get_app_sdk_binding(app.id, "downjoy"),
         true <- SDKDownjoy.validate_session(downjoy_app_id, downjoy_app_key, downjoy_access_token, downjoy_user_id),
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: "downjoy", 
           sdk_user_id: downjoy_user_id, 
           email: nil,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding:  %{downjoy: %{access_token: downjoy_access_token, user_id: downjoy_user_id}}
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
        sdk: "downjoy",
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end