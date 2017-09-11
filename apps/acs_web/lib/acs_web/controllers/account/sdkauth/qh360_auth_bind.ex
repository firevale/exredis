defmodule AcsWeb.Qh360AuthBind do
  use     AcsWeb, :controller
  require Logger
  require SDKQh360

  def bind(%Plug.Conn{private: %{acs_app: %RedisApp{sdk_bindings: %{qh360: %{}}} = app,
                                 acs_device_id: device_id,
                                 acs_platform: platform}} = conn, 
           %{"qh360_access_token" => qh360_access_token} = _params) do

    case SDKQh360.validate_session(qh360_access_token) do
      %{id: qh360_user_id, name: qh360_nick_name, avatar: qh360_picture_url} ->
        case RedisUser.bind_sdk_user(%{sdk: :qh360, 
                                       app_id: app.id, 
                                       sdk_user_id: qh360_user_id, 
                                       email: nil,
                                       nickname: qh360_nick_name,
                                       device_id: device_id,
                                       mobile: nil,
                                       avatar_url: qh360_picture_url}) do 
          {:ok, user} -> 
            access_token = RedisAccessToken.create(%{
              app_id: app.id,
              user_id: user.id,
              device_id: device_id,
              platform: platform,
              ttl: app.token_ttl,
              binding: %{qh360: %{access_token: qh360_access_token, user_id: qh360_user_id}}
            })

            conn |> json(%{
              success: true,
              access_token: access_token.id,
              expires_at: RedisAccessToken.expired_at(access_token),
              user_id: "#{user.id}",
              user_email: user.email,
              nick_name:  user.nickname,
              is_anonymous: false,
              sdk: :qh360,
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