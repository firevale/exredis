defmodule AcsWeb.AnzhiAuthBind do
  use     AcsWeb, :controller
  require Logger
  require SDKAnzhi

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{sdk_bindings: %{anzhi: %{"app_key" => anzhi_app_key, "app_secret" => anzhi_app_secret}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"anzhi_access_token" => anzhi_access_token,
              "anzhi_user_id" => anzhi_user_id} = params) do

    if SDKAnzhi.validate_session(anzhi_app_key, anzhi_app_secret, anzhi_access_token) do
      case Accounts.bind_sdk_user(%{sdk: :anzhi, 
                                     app_id: app.id, 
                                     sdk_user_id: anzhi_user_id, 
                                     email: nil,
                                     nickname: params["anzhi_nickname"],
                                     mobile: nil,
                                     avatar_url: nil}) do 
        {:ok, user} -> 
          access_token = Auth.create_access_token(%{
            app_id: app.id,
            user_id: user.id,
            device_id: device_id,
            platform: platform,
            ttl: app.token_ttl,
            binding: %{anzhi: %{access_token: anzhi_access_token, user_id: anzhi_user_id}}
          })

          conn |> json(%{
            success: true,
            access_token: access_token.id,
            expires_at: AccessToken.expired_at(access_token),
            user_id: "#{user.id}",
            user_email: user.email,
            nick_name:  user.nickname,
            is_anonymous: false,
            sdk: :anzhi,
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