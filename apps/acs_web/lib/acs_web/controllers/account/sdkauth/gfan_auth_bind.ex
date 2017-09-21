defmodule AcsWeb.GFanAuthBind do
  use     AcsWeb, :controller
  require SDKGFan
  alias   Acs.Apps

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"gf_access_token" => gfan_access_token,
              "gf_user_id" => gfan_user_id}) do

    with %AppSdkBinding{binding: %{"app_key" => gfan_app_key}} <- Apps.get_app_sdk_binding(app.id, "gfan"),
         true <- SDKGFan.validate_session(gfan_app_key, gfan_access_token, gfan_user_id),
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: "gfan", 
           sdk_user_id: gfan_user_id, 
           email: nil,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding:  %{gfan: %{access_token: gfan_access_token, user_id: gfan_user_id}}
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
        sdk: "gfan",
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end