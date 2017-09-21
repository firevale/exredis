defmodule AcsWeb.BaiduAuthBind do
  use     AcsWeb, :controller
  require SDKBaidu
  alias   Acs.Apps

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"baidu_access_token" => baidu_access_token,
              "baidu_user_id" => baidu_user_id}) do

    with %AppSdkBinding{binding: %{"app_id" => baidu_app_id, "app_secret" => baidu_app_secret}} <- Apps.get_app_sdk_binding(app.id, "baidu"),
         true <- SDKBaidu.validate_session(baidu_app_id, baidu_user_id, baidu_access_token, baidu_app_secret),
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: "baidu", 
           sdk_user_id: baidu_user_id, 
           email: nil,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding:  %{baidu: %{access_token: baidu_access_token, user_id: baidu_user_id}}
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
        sdk: "baidu",
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end