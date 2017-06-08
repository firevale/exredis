defmodule Acs.Web.OppoAuthBind do
  use     Acs.Web, :controller
  require Logger
  require SDKOppo

  # for oppo sdk version 1
  def bind(%Plug.Conn{
              private: %{
                acs_app: %RedisApp{sdk_bindings: %{oppo: %{"app_key" => oppo_app_key, "app_secret" => oppo_app_secret}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"oppo_access_token" => oppo_access_token,
              "oppo_token_secret" => oppo_token_secret} = _params) do

    case SDKOppo.validate_session(oppo_app_key, oppo_app_secret, oppo_access_token, oppo_token_secret) do
      %{id: oppo_user_id, email: email, nickname: oppo_nickname, avatar_url: oppo_picture_url} ->
        case RedisUser.bind_sdk_user(%{sdk: :oppo, 
                                       app_id: app.id, 
                                       sdk_user_id: oppo_user_id, 
                                       email: email,
                                       nickname: oppo_nickname,
                                       device_id: device_id,
                                       mobile: nil,
                                       avatar_url: oppo_picture_url}) do 
          {:ok, user} -> 
            access_token = RedisAccessToken.create(%{
              app_id: app.id,
              user_id: user.id,
              device_id: device_id,
              platform: platform,
              ttl: app.token_ttl,
              binding:  %{oppo: %{access_token: oppo_access_token, user_id: oppo_user_id}}
            })

            conn |> json(%{
              success: true,
              access_token: access_token.id,
              expires_at: RedisAccessToken.expired_at(access_token),
              user_id: "#{user.id}",
              user_email: user.email,
              nick_name:  user.nickname,
              is_anonymous: false,
              sdk: :oppo,
              binding: access_token.binding              
            })

          _ ->
            conn |> json(%{success: false, message: "can't bind sdk user"})
        end
      _ ->
        conn |> json(%{success: false, message: "validate session failed"})
    end
  end
  # for oppo sdk version 2
  def bind(%Plug.Conn{
              private: %{
                acs_app: %RedisApp{sdk_bindings: %{oppo: %{"app_key" => oppo_app_key, "app_secret" => oppo_app_secret}}} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"oppo_access_token" => oppo_access_token,
              "oppo_user_id" => oppo_user_id} = _params) do

    case SDKOppo.validate_session2(oppo_app_key, oppo_app_secret, oppo_access_token, oppo_user_id) do
      %{id: _, email: email, nickname: oppo_nickname, avatar_url: oppo_picture_url} ->
        case RedisUser.bind_sdk_user(%{sdk: :oppo, 
                                       app_id: app.id, 
                                       sdk_user_id: oppo_user_id, 
                                       email: email,
                                       nickname: oppo_nickname,
                                       device_id: device_id,
                                       mobile: nil,
                                       avatar_url: oppo_picture_url}) do 
          {:ok, user} -> 
            access_token = RedisAccessToken.create(%{
              app_id: app.id,
              user_id: user.id,
              device_id: device_id,
              platform: platform,
              ttl: app.token_ttl,
              binding: %{oppo: %{access_token: oppo_access_token, user_id: oppo_user_id}}
            })

            conn |> json(%{
              success: true,
              access_token: access_token.id,
              expires_at: RedisAccessToken.expired_at(access_token),
              user_id: "#{user.id}",
              user_email: user.email,
              nick_name:  user.nickname,
              is_anonymous: false,
              sdk: :oppo,
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