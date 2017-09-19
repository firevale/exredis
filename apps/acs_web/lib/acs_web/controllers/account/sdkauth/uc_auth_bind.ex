defmodule AcsWeb.UCAuthBind do
  use     AcsWeb, :controller
  require SDKUC
  alias   Acs.Apps

  def bind(%Plug.Conn{private: %{acs_app: %App{} = app,
                                 acs_device_id: device_id,
                                 acs_platform: platform}} = conn, 
           %{"uc_access_token" => uc_access_token} = params) do
    with %AppSdkBinding{binding: %{"app_id" => uc_app_id, "app_key" => uc_app_key}} <- Apps.get_app_sdk_binding(app.id, "uc"),
         %{id: uc_user_id} <- SDKUC.validate_session(uc_app_id, uc_app_key, uc_access_token, params["debug_mode"]),
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: :uc, 
           sdk_user_id: uc_user_id, 
           email: nil,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding: %{uc: %{access_token: uc_access_token, user_id: uc_user_id}}
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
        sdk: :uc,
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end