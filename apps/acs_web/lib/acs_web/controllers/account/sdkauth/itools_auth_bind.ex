defmodule AcsWeb.ItoolsAuthBind do
  use     AcsWeb, :controller
  require Logger
  require SDKItools

  def bind(%Plug.Conn{
              private: %{
                acs_app: %RedisApp{sdk_bindings: %{itools: %{"app_id" => itools_app_id}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"itools_session_id" => itools_session_id,
              "itools_user_id" => itools_user_id} = params) do

    if SDKItools.validate_session(itools_app_id, itools_session_id) do
      case RedisUser.bind_sdk_user(%{sdk: :itools, 
                                     app_id: app.id, 
                                     sdk_user_id: itools_user_id, 
                                     email: nil,
                                     nickname: params["itools_nickname"],
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
            binding: %{itools: %{session_id: itools_session_id, user_id: itools_user_id}}
          })

          conn |> json(%{
            success: true,
            access_token: access_token.id,
            expires_at: RedisAccessToken.expired_at(access_token),
            user_id: "#{user.id}",
            user_email: user.email,
            nick_name:  user.nickname,
            is_anonymous: false,
            sdk: :itools,
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