defmodule AcsWeb.NdcomAuthBind do
  use     AcsWeb, :controller
  require Logger
  require SDKNdcom

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"ndcom_session_id" => ndcom_session_id,
              "ndcom_user_id" => ndcom_user_id} = params) do
    with %AppSdkBinding{binding: %{
           "app_id" => ndcom_app_id, 
           "app_key" => ndcom_app_key}} <- Apps.get_app_sdk_binding(app.id, "ndcom"),
         true <- SDKNdcom.validate_session(ndcom_app_id, ndcom_app_key, ndcom_session_id, ndcom_user_id),
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: "ndcom", 
           sdk_user_id: ndcom_user_id, 
           email: nil,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding: %{ndcom: %{session_id: ndcom_session_id, user_id: ndcom_user_id}}
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
        sdk: "ndcom",
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end