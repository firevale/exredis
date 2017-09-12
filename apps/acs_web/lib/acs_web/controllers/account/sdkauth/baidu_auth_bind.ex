defmodule AcsWeb.BaiduAuthBind do
  use     AcsWeb, :controller
  require Logger
  require SDKBaidu

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{sdk_bindings: %{baidu: %{"app_id" => baidu_app_id, "app_secret" => baidu_app_secret}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"baidu_access_token" => baidu_access_token,
              "baidu_user_id" => baidu_user_id} = _params) do

    if SDKBaidu.validate_session(baidu_app_id, baidu_user_id, baidu_access_token, baidu_app_secret) do
      case Accounts.bind_sdk_user(%{sdk: :baidu, 
                                     app_id: app.id, 
                                     sdk_user_id: baidu_user_id, 
                                     email: nil,
                                     nickname: baidu_user_id,
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
            binding:  %{baidu: %{access_token: baidu_access_token, user_id: baidu_user_id}}
          })

          conn |> json(%{
            success: true,
            access_token: access_token.id,
            expires_at: AccessToken.expired_at(access_token),
            user_id: "#{user.id}",
            user_email: user.email,
            nick_name:  user.nickname,
            is_anonymous: false,
            sdk: :baidu,
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