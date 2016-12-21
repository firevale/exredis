defmodule Acs.LenovoAuthBind do
  use     Acs.Web, :controller
  require Logger
  require SDKLenovo

  def bind(%Plug.Conn{
              private: %{
                acs_app: %RedisApp{sdk_bindings: %{lenovo: %{"app_" => lenovo_app_id}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"lenovo_access_token" => lenovo_access_token} = _params) do

    case SDKLenovo.validate_session(lenovo_app_id, lenovo_access_token) do
      %{success: true, account_id: lenovo_user_id, user_name: lenovo_nickname} ->
        case RedisUser.bind_sdk_user(%{sdk: :lenovo, 
                                       app_id: app.id, 
                                       sdk_user_id: lenovo_user_id, 
                                       email: nil,
                                       nickname: lenovo_nickname,
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
              binding: %{lenovo: %{access_token: lenovo_access_token, user_id: lenovo_user_id}}
            })

            conn |> json(%{
              success: true,
              access_token: access_token.id,
              expires_at: RedisAccessToken.expired_at(access_token),
              user_id: "#{user.id}",
              user_email: user.email,
              nick_name:  user.nickname,
              is_anonymous: false,
              sdk: :lenovo,
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