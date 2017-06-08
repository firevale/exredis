defmodule Acs.Web.KYAuthBind do
  use     Acs.Web, :controller
  require Logger
  require SDKKY

  def bind(%Plug.Conn{
              private: %{
                acs_app: %RedisApp{sdk_bindings: %{ky: %{"app_key" => ky_app_key}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"ky_session_id" => ky_session_id} = _params) do

    case SDKKY.validate_session(ky_app_key, ky_session_id) do
      %{id: ky_user_id, nickname: ky_nickname} ->
        case RedisUser.bind_sdk_user(%{sdk: :ky, 
                                       app_id: app.id, 
                                       sdk_user_id: ky_user_id, 
                                       email: nil,
                                       nickname: ky_nickname,
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
              binding: %{ky: %{session_id: ky_session_id, user_id: ky_user_id}}
            })

            conn |> json(%{
              success: true,
              access_token: access_token.id,
              expires_at: RedisAccessToken.expired_at(access_token),
              user_id: "#{user.id}",
              user_email: user.email,
              nick_name:  user.nickname,
              is_anonymous: false,
              sdk: :ky,
              binding: access_token.binding              
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