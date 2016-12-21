defmodule Acs.CoolpadAuthBind do
  use     Acs.Web, :controller
  require Logger
  require SDKCoolPad

  def bind(%Plug.Conn{
              private: %{
                acs_app: %RedisApp{sdk_bindings: %{coolpad: %{"app_id" => coolpad_app_id, "app_key" => coolpad_app_key}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"coolpad_auth_code" => coolpad_auth_code} = _params) do

    case SDKCoolPad.validate_session(coolpad_app_id, coolpad_app_key, coolpad_auth_code) do
      %{openid: coolpad_user_id, access_token: coolpad_access_token, nickname: coolpad_nickname} ->
        case RedisUser.bind_sdk_user(%{sdk: :coolpad, 
                                       app_id: app.id, 
                                       sdk_user_id: coolpad_user_id, 
                                       email: nil,
                                       nickname: coolpad_nickname,
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
              binding: %{coolpad: %{access_token: coolpad_access_token, user_id: coolpad_user_id}}
            })

            conn |> json(%{
              success: true,
              access_token: access_token.id,
              expires_at: RedisAccessToken.expired_at(access_token),
              user_id: "#{user.id}",
              user_email: nil,
              nick_name:  user.nickname,
              is_anonymous: false,
              sdk: :coolpad,
              binding: access_token.binding              
            })

          _ ->
            conn |> json(%{success: false, message: "can't bind sdk user"})
        end
      _ ->
        conn |> json(%{success: false, message: "validate auth code failed"})
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end

