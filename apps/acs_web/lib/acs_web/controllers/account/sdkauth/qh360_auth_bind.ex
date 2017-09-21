defmodule AcsWeb.Qh360AuthBind do
  use     AcsWeb, :controller
  require SDKQh360

  def bind(%Plug.Conn{private: %{acs_app: %App{} = app,
                                 acs_device_id: device_id,
                                 acs_platform: platform}} = conn, 
           %{"qh360_access_token" => qh360_access_token}) do
    with %{id: qh360_user_id} <- SDKQh360.validate_session(qh360_access_token),
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: "qh360", 
           sdk_user_id: qh360_user_id, 
           email: nil,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding: %{qh360: %{access_token: qh360_access_token, user_id: qh360_user_id}}
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
        sdk: "qh360",
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end