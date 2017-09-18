defmodule AcsWeb.FacebookAuthBind do
  use     AcsWeb, :controller
  require SDKFacebook

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"fb_access_token" => facebook_access_token} = _params) do

    with %AppSdkBinding{binding: %{"app_secret" => facebook_app_secret}} <- Acs.Apps.get_app_sdk_binding(app.id, "facebook"),
         %{"id" => facebook_user_id, 
           "email" => email, 
           "name" => facebook_nickname} <- SDKFacebook.me(facebook_app_secret, %{fields: "id,email,name,gender"}, facebook_access_token),
        {:ok, user} <- Accounts.bind_sdk_user(%{
          sdk: :facebook, 
          sdk_user_id: facebook_user_id, 
          email: email,
          mobile: nil, 
          }),
        access_token <- Auth.create_access_token(%{
          app_id: app.id,
          user_id: user.id,
          device_id: device_id,
          platform: platform,
          ttl: app.token_ttl,
          binding:  %{facebook: %{access_token: facebook_access_token, user_id: facebook_user_id}}
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
        sdk: :facebook,
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end