defmodule Acs.Web.UserController do
  use Acs.Web, :controller
  import Acs.UploadImagePlugs 

  plug :fetch_app_id
  plug :fetch_app
  plug :fetch_user_id
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
  def create_token(conn, %{"user_key" => account_id, "password" => password}) do
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
              conn 
                |> put_session(:failed_attempts, failed_attempts + 1)
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
                   %{"email" => account_id, "password" => password}) do
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
                   %{"email" => account_id, "password" => password}) do
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
                   %{"account_id" => account_id, "password" => password, "verify_code" => verify_code}) do
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
                    %{"mobile" => mobile, "verify_code" => verify_code}) do
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
                   %{"email" => email, "verify_code" => verify_code}) do
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
                      %{"nickname" => nickname}) do
    
    check_out = check_userid(nickname)
    if(check_out && !check_out.success) do
      conn |> json(check_out)
    else
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
  end
  def update_nickname(conn, _) do 
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def update_resident_info(%Plug.Conn{private: %{acs_session_user: %{id: _user_id} = user}} = conn, 
                           %{"resident_id" => resident_id, "resident_name" => resident_name}) do
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
                        anonymous: is_anonymous,
                        ttl: 604800,
                        binding: %{}
                      })
                      
                    %RedisApp{} = app ->
                      token = RedisAccessToken.create(%{
                        app_id: app_id,
                        user_id: user.id,
                        device_id: device_id,
                        platform: platform,
                        anonymous: is_anonymous,
                        ttl: app.token_ttl,
                        binding: %{}
                      })

                      if app.restrict_login do 
                        case RedisLoginCode.find(app.id, user.id) do 
                          nil -> token
                          %{code: code} ->
                            %{token | login_code: code}
                        end
                      else
                        token
                      end
                  end

    conn = conn |> put_session(:access_token, access_token.id)
      |> put_session(:platform, platform)
      |> put_session(:device_id, device_id)
      |> delete_session(:failed_attempts)
      |> delete_session(:last_failed_timestamp)
      |> delete_session(:register_verify_code)
      |> delete_session(:register_account_id)

    app = conn.private[:acs_app]
    
    if app && app.restrict_login && is_nil(access_token.login_code) do 
      conn |> json(%{success: false, action: "show_login_code"})
    else
      conn |> json(%{
              success: true,
              access_token: access_token.id,
              expires_at: RedisAccessToken.expired_at(access_token),
              user_id: to_string(user.id),
              user_email: user.email || "",
              user_mobile: user.mobile || "",
              nick_name: user.nickname,
              is_anonymous: is_anonymous,
              avatar_url: case user.avatar_url do 
                            nil -> nil
                            "/" <> _ -> static_url(conn, user.avatar_url)
                            "http" <> _ -> user.avatar_url
                          end,
              sdk: :firevale,
              binding: %{},
              bindings: %{}, # 兼容旧的SDK
            })
    end
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

  def get_token_user(conn, %{"access_token" => token_id}) do
    case RedisAccessToken.find(token_id) do
      nil ->
        conn |> json(%{success: false, message: "access token [#{token_id}] not found"})
      
      token ->
        case RedisUser.find(token.user_id) do 
          nil ->
            conn |> json(%{success: false, message: "user not found"})
          
          user ->
            conn |> json(%{success: true, user: %{id: user.id, email: user.email}})
        end
    end
  end

  def authorization_token(conn, params) do
    conn |> redirect(to: "/login/?#{URI.encode_query(params)}")
  end

  plug :convert_base64_image, [param_name: "file"] when action == :update_avatar
  plug :check_upload_image, [
    param_name: "file", 
    sqare: true, 
    format: ["jpg", "jpeg", "png"],
    min_width: 128, 
    reformat: "jpg",
    resize: [width: 128, height: 128]] when action == :update_avatar
  def update_avatar(%Plug.Conn{private: %{acs_session_user: user}} = conn, %{"file" => %{path: image_file_path}}) do 
    _update_avatar(conn, user, image_file_path)
  end
  def update_avatar(%Plug.Conn{private: %{image_file_path: image_file_path, acs_session_user: user}} = conn, _) do 
    _update_avatar(conn, user, image_file_path)
  end

  defp _update_avatar(conn, user, image_file_path) do 
    {:ok, avatar_path} = Utils.deploy_image_file(from: image_file_path, to: "user_avatars")
    new_user = RedisUser.save(%{user | avatar_url: avatar_path})
    conn |> json(%{success: true, user: %{
      id: new_user.id,
      nickname: new_user.nickname,
      avatar_url: new_user.avatar_url,
      inserted_at: new_user.inserted_at
    }})
  end

  def search_users(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{
    "keyword" => "", "page" => _page, "records_per_page" => _records_per_page}) do
    conn |> json(%{success: true, users: []})
  end
  def search_users(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{
    "keyword" => keyword, "page" => _page, "records_per_page" => _records_per_page}) do

    query = from app_user in Acs.Stats.AppUser,
              where: app_user.app_id == ^app_id,
              select: map(app_user, [:user_id, :app_user_id, :app_user_name, :app_user_level, :zone_id, :pay_amount])

    query =
      case Integer.parse(keyword) do
        {int_keyword, ""} ->
          query |> where([au], au.app_user_id == ^keyword or au.user_id == ^int_keyword)

        _  ->
          if String.length(keyword) > 0 do
            query_user =  
              from u in User,
              where: like(u.nickname, ^"%#{keyword}%") or u.email == ^keyword,
              select: u.id

            ids = Repo.all(query_user)

            query |> where([au], like(au.app_user_name, ^"%#{keyword}%") or au.user_id in ^ids)
          else 
            query
          end
      end

    app_users = StatsRepo.all(query)

    users = 
      Enum.map(app_users, fn app_user -> 
        user_id = app_user.user_id
        user = 
          case Process.get("user_#{user_id}") do 
            nil -> 
              user_db = RedisUser.find(user_id) |> Map.take([:nickname, :age, :email, :gender, :avatar_url, :inserted_at])
              Process.put("user_#{user_id}", user_db)
              user_db

            user_cache ->
              user_cache
        end
        Map.merge(app_user, user)
      end)
      
    conn |> json(%{success: true, users: users})
  end

  def bind_login_code(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"login_code" => code}) do 
    code = String.upcase(code)

    case RedisLoginCode.find(app_id, code) do 
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.loginCodeNotExist"})

      %{code: ^code, owner: nil} ->
        conn |> json(%{success: false, i18n_message: "error.server.loginCodeNotExist"})
      
      %{code: ^code} = login_code ->
        case get_session(conn, :access_token) do 
          nil ->
            conn |> json(%{success: false, i18n_message: "error.server.notLogin"})

          token_id ->
            case RedisAccessToken.find(token_id) do 
              nil ->
                conn |> json(%{success: false, i18n_message: "error.server.notLogin"})

              %{app_id: ^app_id, id: ^token_id, user_id: user_id} = access_token ->
                case login_code.user_id do 
                  nil ->
                    now = DateTime.utc_now()
                    login_code = Repo.get_by(AppLoginCode, app_id: app_id, code: code)
                    AppLoginCode.changeset(login_code, %{user_id: user_id, used_at: now}) |> Repo.update!
                    RedisLoginCode.refresh(app_id, code)
                    RedisLoginCode.refresh(app_id, user_id)
                    access_token = %{access_token | login_code: code}
                    RedisAccessToken.save(access_token)
                    response_access_token(conn, access_token)

                  ^user_id ->
                    RedisLoginCode.refresh(app_id, code)
                    RedisLoginCode.refresh(app_id, user_id)
                    access_token = %{access_token | login_code: code}
                    RedisAccessToken.save(access_token)
                    response_access_token(conn, access_token)

                  _ ->
                    conn |> json(%{success: false, i18n_message: "error.server.loginCodeUsed"})
                end
              
              _ ->
                conn |> json(%{success: false, i18n_message: "error.server.networkError"})
            end
        end
    end
  end
  def bind_login_code(conn, _) do 
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def generate_wechat_login_state(conn, _params) do
    state = Utils.generate_token()
    conn  |> put_session(:wechat_login_state, state)
          |> json(%{success: true, state: state})
  end

  defp response_access_token(conn, access_token) do 
    user = RedisUser.find(access_token.user_id)
    conn |> json(%{
            success: true,
            access_token: access_token.id,
            expires_at: RedisAccessToken.expired_at(access_token),
            user_id: to_string(user.id),
            user_email: user.email || "",
            user_mobile: user.mobile || "",
            nick_name: user.nickname,
            is_anonymous: access_token.anonymous,
            avatar_url: case user.avatar_url do 
                          nil -> nil
                          "/" <> _ -> static_url(conn, user.avatar_url)
                          "http" <> _ -> user.avatar_url
                        end,
            sdk: :firevale,
            binding: %{},
            bindings: %{}, # 兼容旧的SDK
          })
  end

  # check text by netease dun
  defp check_userid(userid) do
    # %{success: true}
    case SDKNeteaseDun.check_userid(userid) do 
      {:error, label, info} ->
        if label do
          %{success: false, i18n_message: "account.error.userIdCheckFail"}
        else
          %{success: false, message: info}
        end

      _ -> 
        %{success: true}
    end
  end
end
