defmodule AcsWeb.YYHAuthBind do
  use     AcsWeb, :controller
  require SDKYYH
  alias   Acs.Apps

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"yyh_access_token" => yyh_access_token,
              "yyh_user_id" => yyh_user_id}) do
    with %AppSdkBinding{binding: %{"app_id" => yyh_app_id, "app_key" => yyh_app_key}} <- Apps.get_app_sdk_binding(app.id, "yyh"),
         true <- SDKYYH.validate_session(yyh_app_id, yyh_app_key, yyh_access_token),
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: "yyh", 
           sdk_user_id: yyh_user_id, 
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
           binding:  %{yyh: %{access_token: yyh_access_token, user_id: yyh_user_id}}
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
        sdk: "yyh",
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end