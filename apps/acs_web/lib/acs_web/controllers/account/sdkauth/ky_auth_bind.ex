defmodule AcsWeb.KYAuthBind do
  use     AcsWeb, :controller
  require SDKKY
  alias   Acs.Apps

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"ky_session_id" => ky_session_id}) do
    with %AppSdkBinding{binding: %{"app_key" => ky_app_key}} <- Apps.get_app_sdk_binding(app.id, "ky"),
         %{id: ky_user_id, nickname: ky_nickname} <- SDKKY.validate_session(ky_app_key, ky_session_id),
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: :ky, 
           sdk_user_id: ky_user_id, 
           email: nil,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding: %{ky: %{session_id: ky_session_id, user_id: ky_user_id}}
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
        sdk: :ky,
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end