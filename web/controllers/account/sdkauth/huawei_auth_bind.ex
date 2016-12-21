defmodule Acs.HuaweiAuthBind do
  use     Acs.Web, :controller
  require Logger
  require SDKHuawei

  def bind(%Plug.Conn{
              private: %{
                acs_app: %RedisApp{sdk_bindings: %{huawei: %{}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"hw_access_token" => huawei_access_token} = _params) do

    case SDKHuawei.validate_session(huawei_access_token) do
      %{success: true, user_id: huawei_user_id, nick_name: huawei_nick_name} ->
        case RedisUser.bind_sdk_user(%{sdk: :huawei, 
                                       app_id: app.id, 
                                       sdk_user_id: huawei_user_id, 
                                       email: nil,
                                       nickname: huawei_nick_name,
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
              binding: %{huawei: %{access_token: huawei_access_token, user_id: huawei_user_id}}
            })

            conn |> json(%{
              success: true,
              access_token: access_token.id,
              expires_at: RedisAccessToken.expired_at(access_token),
              user_id: "#{user.id}",
              user_email: user.email,
              nick_name:  user.nickname,
              is_anonymous: false,
              sdk: :huawei,
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