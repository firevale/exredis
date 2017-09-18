defmodule AcsWeb.OppoAuthBind do
  use     AcsWeb, :controller
  require SDKOppo
  alias   Acs.Apps

  # for oppo sdk version 1
  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"oppo_access_token" => oppo_access_token,
              "oppo_token_secret" => oppo_token_secret} = _params) do
    with %AppSdkBinding{binding: %{
           "app_key" => oppo_app_key, 
           "app_secret" => oppo_app_secret}} <- Apps.get_app_sdk_binding(app.id, "oppo"),
         %{id: oppo_user_id, email: email} <- SDKOppo.validate_session(
           oppo_app_key, 
           oppo_app_secret, 
           oppo_access_token, 
           oppo_token_secret),   
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: :oppo, 
           sdk_user_id: oppo_user_id, 
           email: email,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding: %{oppo: %{access_token: oppo_access_token, user_id: oppo_user_id}}
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
        sdk: :oppo,
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end
  # for oppo sdk version 2
  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"oppo_access_token" => oppo_access_token,
              "oppo_user_id" => oppo_user_id} = _params) do
    with %AppSdkBinding{binding: %{
           "app_key" => oppo_app_key, 
           "app_secret" => oppo_app_secret}} <- Apps.get_app_sdk_binding(app.id, "oppo"),
         %{id: _, email: email} <- SDKOppo.validate_session2(
           oppo_app_key, 
           oppo_app_secret, 
           oppo_access_token, 
           oppo_user_id),   
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: :oppo, 
           sdk_user_id: oppo_user_id, 
           email: email,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding: %{oppo: %{access_token: oppo_access_token, user_id: oppo_user_id}}
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
        sdk: :oppo,
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end