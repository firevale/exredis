defmodule AcsWeb.LenovoAuthBind do
  use     AcsWeb, :controller
  require SDKLenovo
  alias   Acs.Apps

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"lenovo_access_token" => lenovo_access_token} = _params) do

    with %AppSdkBinding{binding: %{"app_id" => lenovo_app_id}} <- Apps.get_app_sdk_binding(app.id, "lenovo"),
         %{success: true, 
           account_id: lenovo_user_id, 
<<<<<<< HEAD
           user_name: lenovo_nickname} <- SDKLenovo.validate_session(lenovo_app_id, lenovo_access_token),
=======
           user_name: _lenovo_nickname} <- SDKLenovo.validate_session(lenovo_app_id, lenovo_access_token),
>>>>>>> 000a86a3f018eade02f4043c3619c80588e39ea0
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: "lenovo", 
           sdk_user_id: lenovo_user_id, 
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
           binding: %{lenovo: %{access_token: lenovo_access_token, user_id: lenovo_user_id}}
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
        sdk: "lenovo",
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end