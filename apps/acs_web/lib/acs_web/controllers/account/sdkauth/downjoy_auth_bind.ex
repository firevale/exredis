defmodule AcsWeb.DownjoyAuthBind do
  use     AcsWeb, :controller
  require Logger
  require SDKDownjoy

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{sdk_bindings: %{downjoy: %{app_id: downjoy_app_id, app_key: downjoy_app_key}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"dj_access_token" => downjoy_access_token,
              "dj_user_id" => downjoy_user_id} = _params) do

    if SDKDownjoy.validate_session(downjoy_app_id, downjoy_app_key, downjoy_access_token, downjoy_user_id) do
      case Accounts.bind_sdk_user(%{sdk: :downjoy, 
                                     app_id: app.id, 
                                     sdk_user_id: downjoy_user_id, 
                                     email: nil,
                                     nickname: downjoy_user_id,
                                     device_id: device_id,
                                     mobile: nil,
                                     avatar_url: nil}) do 
        {:ok, user} -> 
          access_token = Auth.create_access_token(%{
            app_id: app.id,
            user_id: user.id,
            device_id: device_id,
            platform: platform,
            ttl: app.token_ttl,
            binding: %{downjoy: %{access_token: downjoy_access_token, user_id: downjoy_user_id}}
          })

          conn |> json(%{
            success: true,
            access_token: access_token.id,
            expires_at: AccessToken.expired_at(access_token),
            user_id: "#{user.id}",
            user_email: user.email,
            nick_name:  user.nickname,
            is_anonymous: false,
            sdk: :downjoy,
            binding: access_token.binding              
          })

        _ ->
          conn |> json(%{success: false, message: "can't bind sdk user"})
      end
    else 
      conn |> json(%{success: false, message: "validate session failed"})
    end
  end 
  def bind(conn, _params) do 
    d "#{inspect conn.private.acs_platform}"
    conn |> json(%{success: false, message: "invalid request"})
  end

end