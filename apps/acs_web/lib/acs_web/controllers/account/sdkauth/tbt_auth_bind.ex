defmodule AcsWeb.TBTAuthBind do
  use     AcsWeb, :controller
  require Logger
  require SDKTBT

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{sdk_bindings: %{tbt: %{"app_id" => tbt_app_id}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"tbt_session_id" => tbt_session_id,
              "tbt_user_id" => tbt_user_id} = params) do

    if SDKTBT.validate_session(tbt_app_id, tbt_session_id) do
      case Accounts.bind_sdk_user(%{sdk: :tbt, 
                                     app_id: app.id, 
                                     sdk_user_id: tbt_user_id, 
                                     email: nil,
                                     nickname: params["tbt_nickname"],
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
            binding: %{tbt: %{session_id: tbt_session_id, user_id: tbt_user_id}}
          })

          conn |> json(%{
            success: true,
            access_token: access_token.id,
            expires_at: AccessToken.expired_at(access_token),
            user_id: "#{user.id}",
            user_email: user.email,
            nick_name:  user.nickname,
            is_anonymous: false,
            sdk: :tbt,
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