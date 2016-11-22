defmodule Acs.PPAuthBind do
  use     Acs.Web, :controller
  require Logger
  require SDKPP

  def bind(%Plug.Conn{
              private: %{
                acs_app: %RedisApp{sdk_bindings: %{pp: %{"app_id" => pp_app_id, "app_key" => pp_app_key}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"pp_session_id" => pp_session_id} = _params) do

    case SDKPP.validate_session(pp_app_id, pp_app_key, pp_session_id) do
      %{id: pp_user_id, nickname: pp_nickname} ->
        case RedisUser.bind_sdk_user(%{sdk: :pp, 
                                       app_id: app.id, 
                                       sdk_user_id: pp_user_id, 
                                       email: nil,
                                       nickname: pp_nickname,
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
              binding: %{pp: %{session_id: pp_session_id, user_id: pp_user_id}}
            })

            conn |> json(%{
              success: true,
              access_token: access_token.id,
              expires_at: RedisAccessToken.expired_at(access_token),
              user_id: "#{user.id}",
              user_email: user.email,
              nick_name:  user.nickname,
              is_anonymous: false,
              sdk: :pp,
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