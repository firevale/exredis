defmodule AcsWeb.I4AuthBind do
  use     AcsWeb, :controller
  require Logger
  require SDKI4

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{sdk_bindings: %{i4: %{}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"i4_session_id" => i4_session_id,
              "i4_user_id" => i4_user_id} = params) do

    if SDKI4.validate_session(i4_session_id) do
      case Accounts.bind_sdk_user(%{sdk: :i4, 
                                     app_id: app.id, 
                                     sdk_user_id: i4_user_id, 
                                     email: nil,
                                     nickname: params["i4_nickname"],
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
            binding: %{i4: %{session_id: i4_session_id, user_id: i4_user_id}}
          })

          conn |> json(%{
            success: true,
            access_token: access_token.id,
            expires_at: AccessToken.expired_at(access_token),
            user_id: "#{user.id}",
            user_email: user.email,
            nick_name:  user.nickname,
            is_anonymous: false,
            sdk: :i4,
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