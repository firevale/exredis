defmodule AcsWeb.CCPlayAuthBind do
  use     AcsWeb, :controller
  require Logger
  require SDKCCPlay

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"cc_access_token" => cc_access_token,
              "cc_user_id" => cc_user_id} = params) do
    with %AppSdkBinding{binding: %{"app_id" => cc_app_id, "app_key" => cc_app_key}} <- Acs.Apps.get_app_sdk_binding(app.id, "cc"),
         true <- SDKCCPlay.validate_session(cc_app_id, cc_app_key, cc_access_token),   
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: :cc, 
           sdk_user_id: cc_user_id, 
           email: nil,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding: %{cc: %{access_token: cc_access_token, user_id: cc_user_id}}
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
        sdk: :cc,
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end