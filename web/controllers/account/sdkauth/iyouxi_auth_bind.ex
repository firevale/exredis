defmodule Acs.IYouxiAuthBind do
  use     Acs.Web, :controller
  require Logger
  require SDKIYouxi

  def bind(%Plug.Conn{
              private: %{
                acs_app: %RedisApp{sdk_bindings: %{iyouxi: %{"client_id" => iyouxi_client_id, 
                                                             "client_secret" => iyouxi_client_secret}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"iyouxi_auth_code" => iyouxi_auth_code,
              "iyouxi_version" => iyouxi_sdk_version} = _params) do

    case SDKIYouxi.validate_session(iyouxi_client_id, iyouxi_client_secret, iyouxi_auth_code, iyouxi_sdk_version) do
      {iyouxi_user_id, iyouxi_access_token, iyouxi_refresh_token} ->
        case RedisUser.bind_sdk_user(%{sdk: :iyouxi, 
                                       app_id: app.id, 
                                       sdk_user_id: iyouxi_user_id, 
                                       email: nil,
                                       nickname: iyouxi_user_id,
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
              binding: %{iyouxi: %{access_token: iyouxi_access_token, 
                                   user_id: iyouxi_user_id,
                                   refresh_token: iyouxi_refresh_token}}
            })

            conn |> json(%{
              success: true,
              access_token: access_token.id,
              expires_at: RedisAccessToken.expired_at(access_token),
              user_id: "#{user.id}",
              user_email: nil,
              nick_name:  user.nickname,
              is_anonymous: false,
              sdk: :iyouxi,
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

