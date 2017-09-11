defmodule AcsWeb.YYHAuthBind do
  use     AcsWeb, :controller
  require Logger
  require SDKYYH

  def bind(%Plug.Conn{
              private: %{
                acs_app: %RedisApp{sdk_bindings: %{yyh: %{"app_id" => yyh_app_id, "app_key" => yyh_app_key}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"yyh_access_token" => yyh_access_token,
              "yyh_user_id" => yyh_user_id} = params) do

    if SDKYYH.validate_session(yyh_app_id, yyh_app_key, yyh_access_token) do
      case RedisUser.bind_sdk_user(%{sdk: :yyh, 
                                     app_id: app.id, 
                                     sdk_user_id: yyh_user_id, 
                                     email: nil,
                                     nickname: params["yyh_NickName"] || yyh_user_id,
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
            binding: %{yyh: %{access_token: yyh_access_token, user_id: yyh_user_id}}
          })

          conn |> json(%{
            success: true,
            access_token: access_token.id,
            expires_at: RedisAccessToken.expired_at(access_token),
            user_id: "#{user.id}",
            user_email: user.email,
            nick_name:  user.nickname,
            is_anonymous: false,
            sdk: :yyh,
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