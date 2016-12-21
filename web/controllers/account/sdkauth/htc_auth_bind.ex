defmodule Acs.HtcAuthBind do
  use     Acs.Web, :controller
  require Logger

  def bind(%Plug.Conn{
              private: %{
                acs_app: %RedisApp{sdk_bindings: %{htc: %{"pub_key" => htc_pub_key}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"htc_session_id" => htc_session_id,
              "htc_user_id" => htc_user_id,
              "htc_account" => htc_account,
              "htc_account_sign" => htc_account_sign} = params) do

    if Utils.rsa_public_verify2(htc_pub_key, htc_account, htc_account_sign) do
      case RedisUser.bind_sdk_user(%{sdk: :htc, 
                                     app_id: app.id, 
                                     sdk_user_id: htc_user_id, 
                                     email: nil,
                                     nickname: params["htc_user_name"],
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
            binding: %{htc: %{session_id: htc_session_id, user_id: htc_user_id}}
          })

          conn |> json(%{
            success: true,
            access_token: access_token.id,
            expires_at: RedisAccessToken.expired_at(access_token),
            user_id: "#{user.id}",
            user_email: user.email,
            nick_name:  user.nickname,
            is_anonymous: false,
            sdk: :htc,
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