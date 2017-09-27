defmodule AcsWeb.YoukuAuthBind do
  use     AcsWeb, :controller
  require SDKYouku
  alias   Acs.Apps

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"youku_session_id" => youku_session_id}) do

    with %AppSdkBinding{binding: %{"app_key" => youku_app_key, "pay_key" => youku_pay_key}} <- Apps.get_app_sdk_binding(app.id, "youku"),
         {:ok, youku_user_id} <- SDKYouku.validate_session(youku_app_key, youku_pay_key, youku_session_id),
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: "youku", 
           sdk_user_id: youku_user_id, 
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
           binding:  %{youku: %{session_id: youku_session_id, user_id: youku_user_id}}
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
        sdk: "youku",
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end