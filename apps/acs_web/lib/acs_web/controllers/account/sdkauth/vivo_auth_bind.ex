defmodule AcsWeb.VivoAuthBind do
  use     AcsWeb, :controller
  require Logger
  require SDKVivo

  def bind(%Plug.Conn{private: %{acs_app: %App{} = app,
                                 acs_device_id: device_id,
                                 acs_platform: platform}} = conn, 
           %{"vivo_access_token" => vivo_access_token,
             "vivo_user_id" => vivo_user_id}) do
    with true <- SDKVivo.validate_session(vivo_user_id, vivo_access_token),
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: :vivo, 
           sdk_user_id: vivo_user_id, 
           email: nil,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding:  %{vivo: %{access_token: vivo_access_token, user_id: vivo_user_id}}
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
        sdk: :vivo,
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end