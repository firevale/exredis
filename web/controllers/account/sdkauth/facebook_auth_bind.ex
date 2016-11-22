defmodule Acs.FacebookAuthBind do
  use     Acs.Web, :controller
  require Logger
  require SDKFacebook

  def bind(%Plug.Conn{
              private: %{
                acs_app: %RedisApp{sdk_bindings: %{facebook: %{"app_secret" => facebook_app_secret}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"fb_access_token" => facebook_access_token} = _params) do

    case SDKFacebook.me(facebook_app_secret, %{fields: "id,email,name,gender"}, facebook_access_token) do
      %{"id" => facebook_user_id, "email" => email, "name" => facebook_nickname} -> 
        case RedisUser.bind_sdk_user(%{sdk: :facebook, 
                                       app_id: app.id, 
                                       sdk_user_id: facebook_user_id, 
                                       email: email,
                                       nickname: facebook_nickname,
                                       device_id: device_id,
                                       mobile: nil,
                                       picture_url: nil}) do 
          {:ok, user} -> 
            access_token = RedisAccessToken.new(%{
              app_id: app.id,
              user_id: user.id,
              device_id: device_id,
              platform: platform,
              ttl: app.token_ttl,
              binding: %{facebook: %{access_token: facebook_access_token, user_id: facebook_user_id}}
            })

            conn |> json(%{
              success: true,
              access_token: access_token.id,
              expires_at: RedisAccessToken.expired_at(access_token),
              user_id: "#{user.id}",
              user_email: user.email,
              nick_name:  user.nickname,
              is_anonymous: false,
              sdk: :facebook,
              binding: access_token.binding,
              bindings: JSON.encode!(access_token.binding) # TODO: 兼容旧版本, 等到枪神更新后可以去掉             
            })

          _ ->
            conn |> json(%{success: false, message: "can't bind sdk user"})
        end
      _ -> 
        conn |> json(%{success: false, message: "validate session failed"})
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end