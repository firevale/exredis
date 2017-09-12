defmodule AcsWeb.XYAuthBind do
  use     AcsWeb, :controller
  require Logger
  require SDKXY

  def bind(%Plug.Conn{private: %{acs_app: %App{sdk_bindings: %{xy: %{"app_id" => xy_app_id}}} = app,
                                 acs_device_id: device_id,
                                 acs_platform: platform}} = conn, 
           %{"xy_access_token" => xy_access_token,
             "xy_user_id" => xy_user_id} = params) do

    if SDKXY.validate_session(xy_app_id, xy_access_token, xy_user_id) do
      case Accounts.bind_sdk_user(%{sdk: :xy, 
                                     app_id: app.id, 
                                     sdk_user_id: xy_user_id, 
                                     email: nil,
                                     nickname: params["xy_nickname"] || xy_user_id,
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
            binding: %{xy: %{access_token: xy_access_token, user_id: xy_user_id}}
          })

          conn |> json(%{
            success: true,
            access_token: access_token.id,
            expires_at: AccessToken.expired_at(access_token),
            user_id: "#{user.id}",
            user_email: user.email,
            nick_name:  user.nickname,
            is_anonymous: false,
            sdk: :xy,
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