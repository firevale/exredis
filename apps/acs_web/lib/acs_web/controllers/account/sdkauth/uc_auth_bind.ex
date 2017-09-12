defmodule AcsWeb.UCAuthBind do
  use     AcsWeb, :controller
  require Logger
  require SDKUC

  def bind(%Plug.Conn{private: %{acs_app: %App{sdk_bindings: %{uc: %{"app_id" => uc_app_id, "app_key" => uc_app_key}}} = app,
                                 acs_device_id: device_id,
                                 acs_platform: platform}} = conn, 
           %{"uc_access_token" => uc_access_token} = params) do

    case SDKUC.validate_session(uc_app_id, uc_app_key, uc_access_token, params["debug_mode"]) do
      %{id: uc_user_id, nickname: uc_nickname} ->
        case Accounts.bind_sdk_user(%{sdk: :uc, 
                                       app_id: app.id, 
                                       sdk_user_id: uc_user_id, 
                                       email: nil,
                                       nickname: uc_nickname,
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
              binding: %{uc: %{access_token: uc_access_token, user_id: uc_user_id}}
            })

            conn |> json(%{
              success: true,
              access_token: access_token.id,
              expires_at: AccessToken.expired_at(access_token),
              user_id: "#{user.id}",
              user_email: user.email,
              nick_name:  user.nickname,
              is_anonymous: false,
              sdk: :uc,
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