defmodule AcsWeb.IYouxiAuthBind do
  use     AcsWeb, :controller
  require SDKIYouxi
  alias   Acs.Apps

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"iyouxi_auth_code" => iyouxi_auth_code,
              "iyouxi_version" => iyouxi_sdk_version}) do
    with %AppSdkBinding{binding: %{
      "client_id" => iyouxi_client_id, 
      "client_secret" => iyouxi_client_secret}} <- Apps.get_app_sdk_binding(app.id, "iyouxi"),
         {iyouxi_user_id, iyouxi_access_token, iyouxi_refresh_token} <- SDKIYouxi.validate_session(
           iyouxi_client_id, 
           iyouxi_client_secret, 
           iyouxi_auth_code, 
           iyouxi_sdk_version),   
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: :iyouxi, 
           sdk_user_id: iyouxi_user_id, 
           email: nil,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding: %{iyouxi: %{access_token: iyouxi_access_token, user_id: iyouxi_user_id, refresh_token: iyouxi_refresh_token}}
         })
    do 
      conn |> json(%{
        success: true,
        access_token: access_token.id,
        expires_at: AccessToken.expired_at(access_token),
        user_id: "#{user.id}",
        user_email: user.email,
        nick_name: user.nickname,
        is_anonymous: false,
        sdk: :iyouxi,
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end

