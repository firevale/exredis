defmodule Acs.YoukuAuthBind do
  use     Acs.Web, :controller
  require Logger
  require SDKYouku

  def bind(%Plug.Conn{
              private: %{
                acs_app: %RedisApp{sdk_bindings: %{youku: %{"app_key" => youku_app_key, "pay_key" => youku_pay_key}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"youku_session_id" => youku_session_id} = params) do

    case SDKYouku.validate_session(youku_app_key, youku_pay_key, youku_session_id) do
      {:ok, youku_user_id} ->
        case RedisUser.bind_sdk_user(%{sdk: :youku, 
                                      app_id: app.id, 
                                      sdk_user_id: youku_user_id, 
                                      email: nil,
                                      nickname: params["youku_user_name"],
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
              binding: %{youku: %{session_id: youku_session_id, user_id: youku_user_id}}
            })

            conn |> json(%{
              success: true,
              access_token: access_token.id,
              expires_at: RedisAccessToken.expired_at(access_token),
              user_id: "#{user.id}",
              user_email: user.email,
              nick_name:  user.nickname,
              is_anonymous: false,
              sdk: :youku,
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