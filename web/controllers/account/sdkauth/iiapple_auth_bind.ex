defmodule Acs.IIAppleAuthBind do
  use     Acs.Web, :controller
  require Logger
  require SDKIIApple

  def bind(%Plug.Conn{
              private: %{
                acs_app: %RedisApp{sdk_bindings: %{iiapple: %{"app_id" => iiapple_app_id, "app_key" => iiapple_app_key}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"iiapple_session_id" => iiapple_session_id,
              "iiapple_user_id" => iiapple_user_id} = params) do

    if SDKIIApple.validate_session(iiapple_app_id, iiapple_app_key, iiapple_user_id, iiapple_session_id) do
      case RedisUser.bind_sdk_user(%{sdk: :iiapple, 
                                     app_id: app.id, 
                                     sdk_user_id: iiapple_user_id, 
                                     email: nil,
                                     nickname: params["iiapple_nickname"],
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
            binding: %{iiapple: %{session_id: iiapple_session_id, user_id: iiapple_user_id}}
          })

          conn |> json(%{
            success: true,
            access_token: access_token.id,
            expires_at: RedisAccessToken.expired_at(access_token),
            user_id: "#{user.id}",
            user_email: user.email,
            nick_name:  user.nickname,
            is_anonymous: false,
            sdk: :iiapple,
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