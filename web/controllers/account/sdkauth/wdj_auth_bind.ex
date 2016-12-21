defmodule Acs.WandoujiaAuthBind do
  use     Acs.Web, :controller
  require Logger
  require SDKWandoujia

  def bind(%Plug.Conn{private: %{acs_app: %RedisApp{sdk_bindings: %{wdj: %{"app_id" => wdj_app_id}}} = app,
                                 acs_device_id: device_id,
                                 acs_platform: platform}} = conn, 
           %{"wdj_access_token" => wdj_access_token,
             "wdj_user_id" => wdj_user_id} = _params) do

    if SDKWandoujia.validate_session(wdj_app_id, wdj_user_id, wdj_access_token) do
      case RedisUser.bind_sdk_user(%{sdk: :wdj, 
                                     app_id: app.id, 
                                     sdk_user_id: wdj_user_id, 
                                     email: nil,
                                     nickname: wdj_user_id,
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
            binding: %{wdj: %{access_token: wdj_access_token, user_id: wdj_user_id}}
          })

          conn |> json(%{
            success: true,
            access_token: access_token.id,
            expires_at: RedisAccessToken.expired_at(access_token),
            user_id: "#{user.id}",
            user_email: user.email,
            nick_name:  user.nickname,
            is_anonymous: false,
            sdk: :wdj,
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