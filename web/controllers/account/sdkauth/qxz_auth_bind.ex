defmodule Acs.QxzAuthBind do
  use     Acs.Web, :controller
  require Logger
  require SDKQxz

  def bind(%Plug.Conn{private: %{acs_app: %RedisApp{sdk_bindings: %{qxz: %{"app_id" => qxz_app_id, "app_key" => qxz_app_key}}} = app,
                                 acs_device_id: device_id,
                                 acs_platform: platform}} = conn, 
           %{"qxz_user_id" => qxz_user_id} = _params) do
    if SDKQxz.validate_session(qxz_app_id, qxz_app_key, qxz_user_id) do
      case RedisUser.bind_sdk_user(%{sdk: :qxz, 
                                     app_id: app.id, 
                                     sdk_user_id: qxz_user_id, 
                                     email: nil,
                                     nickname: qxz_user_id,
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
            binding: %{qxz: %{user_id: qxz_user_id}}
          })

          conn |> json(%{
            success: true,
            access_token: access_token.id,
            expires_at: RedisAccessToken.expired_at(access_token),
            user_id: "#{user.id}",
            user_email: user.email,
            nick_name:  user.nickname,
            is_anonymous: false,
            sdk: :qxz,
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