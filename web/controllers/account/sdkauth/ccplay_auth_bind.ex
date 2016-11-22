defmodule Acs.CCPlayAuthBind do
  use     Acs.Web, :controller
  require Logger
  require SDKCCPlay

  def bind(%Plug.Conn{
              private: %{
                acs_app: %RedisApp{sdk_bindings: %{cc: %{"app_id" => cc_app_id, "app_key" => cc_app_key}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"cc_access_token" => cc_access_token,
              "cc_user_id" => cc_user_id} = params) do

    if SDKCCPlay.validate_session(cc_app_id, cc_app_key, cc_access_token) do
      case RedisUser.bind_sdk_user(%{sdk: :cc, 
                                     app_id: app.id, 
                                     sdk_user_id: cc_user_id, 
                                     email: nil,
                                     nickname: params["cc_NickName"],
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
            binding: %{cc: %{access_token: cc_access_token, user_id: cc_user_id}}
          })

          conn |> json(%{
            success: true,
            access_token: access_token.id,
            expires_at: RedisAccessToken.expired_at(access_token),
            user_id: "#{user.id}",
            user_email: user.email,
            nick_name:  user.nickname,
            is_anonymous: false,
            sdk: :cc,
            binding: access_token.binding              
          })

        _ ->
          conn |> json(%{success: false, message: "can't bind sdk user"})
      end
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end