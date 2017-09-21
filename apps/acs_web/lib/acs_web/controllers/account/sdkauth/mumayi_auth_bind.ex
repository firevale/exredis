defmodule AcsWeb.MumayiAuthBind do
  use     AcsWeb, :controller
  require SDKMumayi

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"mmy_access_token" => mumayi_access_token,
              "mmy_user_id" => mumayi_user_id} = params) do
    with SDKMumayi.validate_session(mumayi_access_token, mumayi_user_id),   
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: "mumayi", 
           sdk_user_id: mumayi_user_id, 
           email: nil,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding: %{mumayi: %{access_token: mumayi_access_token, user_id: mumayi_user_id}}
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
        sdk: "mumayi",
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end