defmodule AcsWeb.SogouAuthBind do
  use     AcsWeb, :controller
  require SDKSogou
  alias   Acs.Apps

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"sogou_access_token" => sogou_access_token,
              "sogou_user_id" => sogou_user_id}) do
    with %AppSdkBinding{binding: %{
           "app_id" => sogou_app_id, 
           "app_secret" => sogou_app_secret}} <- Apps.get_app_sdk_binding(app.id, "sogou"),
         true <- SDKSogou.validate_session(sogou_app_id, sogou_access_token, sogou_user_id, sogou_app_secret),
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: :sogou, 
           sdk_user_id: sogou_user_id, 
           email: nil,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding: %{sogou: %{access_token: sogou_access_token, user_id: sogou_user_id}}
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
        sdk: :sogou,
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end