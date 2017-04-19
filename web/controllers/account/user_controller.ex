defmodule Acs.UserController do
  use Acs.Web, :controller

  plug :fetch_app_id
  plug :fetch_app
  plug :fetch_session_user_id  
  plug :fetch_session_user
  plug :no_emoji, [param_name: "nickname"] when action == :update_nickname

  def is_account_exists(conn, %{"account_id" => ""}) do
    conn |> json(%{success: true, exists: false})
  end
  def is_account_exists(conn, %{"account_id" => account_id}) do
    conn |> json(%{success: true, exists: RedisUser.exists?(account_id)})
  end
  def is_account_exists(conn, %{"key" => account_id}) do
    conn |> json(%{success: true, exists: RedisUser.exists?(account_id)})
  end

  def create_token(conn, %{"account_id" => "", "password" => _password}) do
    conn |> json(%{success: false, message: "invalid account id"})
  end
  # 兼容旧fvsdk
  def create_token(conn, %{"user_key" => "", "password" => _password}) do
    conn |> json(%{success: false, message: "invalid account id"})
  end
  # 兼容旧fvsdk
  def create_token(conn, %{"user_key" => account_id, "password" => password} = params) do
    create_token(conn, %{"account_id" => account_id, "password" => password})
  end
  def create_token(%Plug.Conn{private: %{acs_app_id: app_id,
                                         acs_device_id: device_id,
                                         acs_platform: platform}} = conn,
                   %{"account_id" => account_id, "password" => password}) do
    case RedisUser.find(account_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.accountNotExist"})

      %RedisUser{} ->
        now = Utils.unix_timestamp
        last_failed_timestamp = get_session(conn, :last_failed_timestamp) || 0

        failed_attempts = if now - last_failed_timestamp > 300 do
                            0 # cooldown time reached, clear failed_attempts counter
                          else
                            get_session(conn, :failed_attempts) || 0
                          end

        if failed_attempts < 10 do
          case RedisUser.authenticate(account_id, password) do
            {:ok, user} ->
              create_and_response_access_token(conn, user, app_id, device_id, platform)
            _ ->
              conn |> put_session(:failed_attempts, failed_attempts + 1)
                  |> put_session(:last_failed_timestamp, now)
                  |> json(%{success: false, i18n_message: "error.server.passwordNotMatch"})
          end
        else
          conn |> json(%{success: false, i18n_message: "error.server.tooManyFails"})
        end
    end
  end

  def bind_token(conn, %{"sdk" => sdk} = params) do
    conn |> redirect(to: "/api/auth/bind/#{sdk}?#{URI.encode_query(params)}")
  end

  # 兼容旧的fvsdk
  def bind_anonymous(%Plug.Conn{private: %{acs_app_id: app_id,
                                           acs_device_id: device_id,
                                           acs_platform: platform}} = conn,
                   %{"email" => account_id, "password" => password} = params) do
    if RedisUser.exists?(account_id) do
      conn |> json(%{success: false, i18n_message: "error.server.accountInUse"})
    else
      case RedisUser.bind_anonymous_user(account_id, password, device_id) do
        nil ->
          conn |> json(%{success: false, i18n_message: "error.server.anonymousUserNotFound"})
          
        %RedisUser{} = user ->
          create_and_response_access_token(conn, user, app_id, device_id, platform)
      end
    end
  end

  def email_regist(%Plug.Conn{private: %{acs_app_id: app_id,
                                         acs_device_id: device_id,
                                         acs_platform: platform}} = conn,
                   %{"email" => account_id, "password" => password} = params) do
    if RedisUser.exists?(account_id) do
      conn |> json(%{success: false, i18n_message: "error.server.accountInUse"})
    else
      user = RedisUser.create!(account_id, password)
      user = RedisUser.save!(user)
      create_and_response_access_token(conn, user, app_id, device_id, platform)
    end
  end
  def email_regist(conn, params) do
    error "invalid email regist params: #{inspect params, pretty: true}"
    conn |> json(%{success: false, message: "invalid request params"})
  end

  def create_user(conn, %{"verify_code" => ""}) do
    conn |> json(%{success: false, i18n_message: "error.server.emptyVerifyCode"})
  end
  def create_user(%Plug.Conn{private: %{acs_app_id: app_id,
                                        acs_device_id: device_id,
                                        acs_platform: platform}} = conn,
                   %{"account_id" => account_id, "password" => password, "verify_code" => verify_code} = params) do
    if RedisUser.exists?(account_id) do
      conn |> json(%{success: false, i18n_message: "error.server.accountInUse"})
    else
      case get_session(conn, :register_verify_code) do
        ^verify_code ->
          is_valid_account = case get_session(conn, :register_account_id) do
                              nil -> true
                              ^account_id -> true
                              _ -> false
                             end
          if is_valid_account do
            user = RedisUser.create!(account_id, password)
            user = RedisUser.save!(user)
            create_and_response_access_token(conn, user, app_id, device_id, platform)
          else
            conn |> json(%{success: false, i18n_message: "error.server.accountIdChanged"})
          end
        _ ->
          conn |> json(%{success: false, i18n_message: "error.server.invalidVerifyCode"})
      end
    end
  end

  def update_password(conn, %{"key" => account_id, "token" => verify_code, "password" => password}) do
    update_password(conn, %{"account_id" => account_id, "verify_code" => verify_code, "password" => password})
  end
  def update_password(conn, %{"account_id" => account_id, "verify_code" => verify_code, "password" => password}) do
    case RedisUser.find(account_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.accountNotFound"})

      %RedisUser{} = user ->
        case get_session(conn, :retrieve_password_account_id) do
          ^account_id ->
            case get_session(conn, :retrieve_password_verify_code) do
              ^verify_code ->
                user = %{user | encrypted_password: Utils.hash_password(password)}
                RedisUser.save!(user)
                conn |> delete_session(:retrieve_password_verify_code)
                     |> delete_session(:retrieve_password_account_id)
                     |> json(%{success: true})
              _ ->
                conn |> json(%{success: false, i18n_message: "error.server.invalidVerifyCode"})
            end
          _ ->
            conn |> json(%{success: false, i18n_message: "error.server.accountIdChanged"})
       end
    end
  end

  def update_mobile(%Plug.Conn{private: %{acs_session_user: %{id: user_id} = user}} = conn, 
                    %{"mobile" => mobile, "verify_code" => verify_code} = params) do
    case get_session(conn, :bind_mobile_verify_code) do
      ^verify_code ->
        case RedisUser.find(mobile) do 
          nil -> _update_mobile(conn, user, mobile) 
          %{id: ^user_id} -> _update_mobile(conn, user, mobile) 
          _ -> conn |> json(%{success: false, i18n_message: "error.server.mobileInUse"})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.invalidVerifyCode"})
    end
  end
  def update_mobile(conn, _) do 
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  defp _update_mobile(conn, user, mobile) do 
    user = %{user | mobile: mobile, device_id: nil}
    user = if is_bitstring(conn.params["password"]) and String.length(conn.params["password"]) >= 6 do 
      %{user | encrypted_password: Utils.hash_password(conn.params["password"])}
    else 
      user
    end
    RedisUser.save!(user)
    conn |> delete_session(:bind_mobile_verify_code)
         |> delete_session(:bind_mobile_account_id)
         |> json(%{success: true})
  end

  def update_email(%Plug.Conn{private: %{acs_session_user: %{id: user_id} = user}} = conn, 
                   %{"email" => email, "verify_code" => verify_code} = params) do
    case get_session(conn, :bind_email_verify_code) do
      ^verify_code ->
        case RedisUser.find(email) do 
          nil -> _update_email(conn, user, email)
          %{id: ^user_id} -> _update_email(conn, user, email)
          _ -> conn |> json(%{success: false, i18n_message: "error.server.emailInUse"})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.invalidVerifyCode"})
    end
  end
  def update_email(conn, _) do 
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  defp _update_email(conn, user, email) do 
    user = %{user | email: email, device_id: nil}
    user = if is_bitstring(conn.params["password"]) and String.length(conn.params["password"]) >= 6 do 
      %{user | encrypted_password: Utils.hash_password(conn.params["password"])}
    else 
      user
    end
    RedisUser.save!(user)
    conn |> delete_session(:bind_email_verify_code)
         |> delete_session(:bind_email_account_id)
         |> json(%{success: true})
  end

  def update_nickname(%Plug.Conn{private: %{acs_session_user: %{id: user_id} = user}} = conn, 
                      %{"nickname" => nickname} = params) do
                
    query = from u in Acs.User,
            select: count(1),
            where: u.nickname == ^nickname and u.id != ^user_id

    case Repo.one!(query) do 
      0 -> 
        user = %{user | nickname: nickname}
        RedisUser.save!(user)
        conn |> json(%{success: true})
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.nicknameInUse"})
    end
  end
  def update_nickname(conn, _) do 
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def update_resident_info(%Plug.Conn{private: %{acs_session_user: %{id: user_id} = user}} = conn, 
                           %{"resident_id" => resident_id, "resident_name" => resident_name} = params) do
    user = %{user | resident_id: resident_id, resident_name: resident_name}
    RedisUser.save!(user)
    conn |> json(%{success: true})
  end
  def update_resident_info(conn, _) do 
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def create_anonymous_token(%Plug.Conn{private: %{acs_app_id: app_id,
                                                   acs_device_id: device_id,
                                                   acs_platform: platform}} = conn, _) do
    user = RedisUser.fetch_anonymous_user(device_id)
    create_and_response_access_token(conn, user, app_id, device_id, platform, true)
  end

  def update_token(%Plug.Conn{private: %{acs_app_id: app_id,
                                         acs_device_id: device_id,
                                         acs_platform: platform}} = conn,
                   %{"access_token" => access_token_id}) do
    d "acs_app_id: #{app_id}, acs_device_id: #{device_id}, acs_platform: #{platform}, access_token_id: #{access_token_id}"

    case RedisAccessToken.find(access_token_id) do
      nil ->
        error "access token not found for #{access_token_id}"
        conn |> json(%{success: false,
                       message: "access token not found"})

      %RedisAccessToken{app_id: ^app_id, device_id: ^device_id, user_id: user_id} = token ->
        case RedisUser.find(user_id) do
          nil ->
            conn |> json(%{success: false,
                           message: "token user not exists!"})
          %RedisUser{} = user ->
            RedisAccessToken.delete(token)
            create_and_response_access_token(conn, user, app_id, device_id, platform, !is_nil(user.device_id))
        end

      what ->
        error "invalid access token found for #{access_token_id}, #{inspect what, pretty: true}"
        conn |> json(%{success: false,
                       message: "invalid access token id"})
    end
  end

  defp create_and_response_access_token(%Plug.Conn{} = conn, %RedisUser{} = user, app_id, device_id, platform, is_anonymous \\ false) do
    access_token = case conn.private[:acs_app] do
                    nil ->
                      RedisAccessToken.create(%{
                        app_id: app_id,
                        user_id: user.id,
                        device_id: device_id,
                        platform: platform,
                        ttl: 604800,
                        binding: %{}
                      })
                    %RedisApp{} = app ->
                      RedisAccessToken.create(%{
                        app_id: app_id,
                        user_id: user.id,
                        device_id: device_id,
                        platform: platform,
                        ttl: app.token_ttl,
                        binding: %{}
                      })
                  end

      conn |> put_session(:access_token, access_token.id)
           |> put_session(:platform, platform)
           |> put_session(:device_id, device_id)
           |> delete_session(:failed_attempts)
           |> delete_session(:last_failed_timestamp)
           |> delete_session(:register_verify_code)
           |> delete_session(:register_account_id)
           |> json(%{
               success: true,
               access_token: access_token.id,
               expires_at: RedisAccessToken.expired_at(access_token),
               user_id: to_string(user.id),
               user_email: user.email || "",
               user_mobile: user.mobile || "",
               nick_name: user.nickname,
               is_anonymous: is_anonymous,
               sdk: :firevale,
               binding: %{},
               bindings: %{}, # 兼容旧的SDK
             })
  end

  def logout(conn, _params) do
    case get_session(conn, :access_token) do
      nil ->
        conn |> json(%{success: true})

      access_token_id ->
        case RedisAccessToken.find(access_token_id) do
          %RedisAccessToken{} = token ->
            RedisAccessToken.delete(token)
            conn |> delete_session(:access_token)
                 |> json(%{success: true})
          _ ->
            # already logged out
            conn |> json(%{success: true})
        end
    end
  end

  def verify_token(%Plug.Conn{private: %{acs_app: app,
                                         acs_user: user}} = conn,
                   %{"access_token" => token_id,
                     "sign" => sign
                     }) do

    case RedisAccessToken.find(token_id) do
      nil ->
        conn |> json(%{success: false, message: "access token [#{token_id}] not found"})

      token ->
        case Utils.md5_sign("#{token_id}#{app.secret}") do
          ^sign ->
            if user.id == token.user_id do
              conn |> json(%{success: true,
                             message: "ok",
                             email: user.email,
                             mobile: user.mobile,
                             id: user.id,
                             avatar_url: user.avatar_url})
            else
              conn |> json(%{success: false,
                             message: "user[#{user.id}] don't own token[#{token_id}]"})
            end
          x ->
            error "receive invalid verify token request, their_sign: #{sign}, our_sign: #{x}"
            conn |> json(%{success: false, message: "signature mismatch"})
        end
    end
  end
  def verify_token(conn, _params) do 
    conn |> json(%{success: false, message: "app not found, check your verify token url & location"})
  end

  def authorization_token(conn, params) do
    conn |> redirect(to: "/login/?#{URI.encode_query(params)}")
  end
end
