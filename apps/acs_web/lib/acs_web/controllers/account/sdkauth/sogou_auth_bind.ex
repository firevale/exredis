defmodule AcsWeb.SogouAuthBind do
  use     AcsWeb, :controller
  require Logger
  require SDKSogou

  def bind(%Plug.Conn{
              private: %{
                acs_app: %RedisApp{sdk_bindings: %{sogou: %{"app_id" => sogou_app_id, "app_secret" => sogou_app_secret}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"sogou_access_token" => sogou_access_token,
              "sogou_user_id" => sogou_user_id} = params) do

    if SDKSogou.validate_session(sogou_app_id, sogou_access_token, sogou_user_id, sogou_app_secret) do
      case RedisUser.bind_sdk_user(%{sdk: :sogou, 
                                     app_id: app.id, 
                                     sdk_user_id: sogou_user_id, 
                                     email: nil,
                                     nickname: params["sogou_NickName"] || sogou_user_id,
                                     device_id: device_id,
                                     mobile: nil,
                                     avatar_url: nil}) do 
        {:ok, user} -> 
          access_token = RedisAccessToken.create(%{
            app_id: app.id,
            user_id: user.id,
            device_id: device_id,
            platform: platform,
            ttl: app.token_ttl,
            binding: %{sogou: %{access_token: sogou_access_token, user_id: sogou_user_id}}
          })

          conn |> json(%{
            success: true,
            access_token: access_token.id,
            expires_at: RedisAccessToken.expired_at(access_token),
            user_id: "#{user.id}",
            user_email: user.email,
            nick_name:  user.nickname,
            is_anonymous: false,
            sdk: :sogou,
            binding: access_token.binding              
          })

        _ ->
          conn |> json(%{success: false, message: "can't bind sdk user"})
      end
    else
      conn |> json(%{success: false, message: "validate session failed"})
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end