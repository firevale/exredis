defmodule AcsWeb.UserController do
  use AcsWeb, :controller

  plug :fetch_app_id
  plug :fetch_app
  plug :fetch_user_id
  plug :fetch_session_user_id
  plug :fetch_session_user

  def is_account_exists(conn, %{"account_id" => ""}) do
    conn |> json(%{success: true, exists: false})
  end
  def is_account_exists(conn, %{"account_id" => account_id}) do
    conn |> json(%{success: true, exists: CachedUser.get!(account_id)})
  end
  def is_account_exists(conn, %{"key" => account_id}) do
    conn |> json(%{success: true, exists: CachedUser.get!(account_id)})
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
    case CachedUser.get(account_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.accountNotExist"})

      %User{} ->
        now = Utils.unix_timestamp
        last_failed_timestamp = get_session(conn, :last_failed_timestamp) || 0

        failed_attempts = if now - last_failed_timestamp > 300 do
                            0 # cooldown time reached, clear failed_attempts counter
                          else
                            get_session(conn, :failed_attempts) || 0
                          end

        if failed_attempts < 10 do
          case Auth.authenticate(account_id, password) do
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
    if CachedUser.get!(account_id) do
      conn |> json(%{success: false, i18n_message: "error.server.accountInUse"})
    else
      case CachedUser.bind_anonymous_user(account_id, password, device_id) do
        nil ->
          conn |> json(%{success: false, i18n_message: "error.server.anonymousUserNotFound"})

        %User{} = user ->
          create_and_response_access_token(conn, user, app_id, device_id, platform)
      end
    end
  end

  def email_regist(%Plug.Conn{private: %{acs_app_id: app_id,
                                         acs_device_id: device_id,
                                         acs_platform: platform}} = conn,
                   %{"email" => account_id, "password" => password}) do
    if CachedUser.get!(account_id) do
      conn |> json(%{success: false, i18n_message: "error.server.accountInUse"})
    else
      user = CachedUser.create!(account_id, password)
      user = CachedUser.save!(user)
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
    if CachedUser.get!(account_id) do
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
            user = CachedUser.create!(account_id, password)
            user = CachedUser.save!(user)
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
    case CachedUser.get(account_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.accountNotFound"})

      %User{} = user ->
        case get_session(conn, :retrieve_password_account_id) do
          ^account_id ->
            case get_session(conn, :retrieve_password_verify_code) do
              ^verify_code ->
                user = %{user | encrypted_password: Utils.hash_password(password)}
                CachedUser.save!(user)
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
        case CachedUser.get(mobile) do
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
    CachedUser.save!(user)
    conn |> delete_session(:bind_mobile_verify_code)
         |> delete_session(:bind_mobile_account_id)
         |> json(%{success: true})
  end

  def update_email(%Plug.Conn{private: %{acs_session_user: %{id: user_id} = user}} = conn,
                   %{"email" => email, "verify_code" => verify_code}) do
    case get_session(conn, :bind_email_verify_code) do
      ^verify_code ->
        case CachedUser.get(email) do
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
    CachedUser.save!(user)
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
          CachedUser.save!(user)
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
    CachedUser.save!(user)
    conn |> json(%{success: true})
  end
  def update_resident_info(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def create_anonymous_token(%Plug.Conn{private: %{acs_app_id: app_id,
                                                   acs_device_id: device_id,
                                                   acs_platform: platform}} = conn, _) do
    user = CachedUser.fetch_anonymous_user(device_id)
    create_and_response_access_token(conn, user, app_id, device_id, platform, true)
  end

  def update_token(%Plug.Conn{private: %{acs_app_id: app_id,
                                         acs_device_id: device_id,
                                         acs_platform: platform}} = conn,
                   %{"access_token" => access_token_id}) do
    case AccessToken.get(access_token_id) do
      nil ->
        error "access token not found for #{access_token_id}"
        conn |> json(%{success: false,
                       message: "access token not found"})

      %AccessToken{app_id: ^app_id, device_id: ^device_id, user_id: user_id} = token ->
        case CachedUser.get(user_id) do
          nil ->
            conn |> json(%{success: false,
                           message: "token user not exists!"})
          %User{} = user ->
            Auth.del_access_token(token)
            create_and_response_access_token(conn, user, app_id, device_id, platform, !is_nil(user.device_id))
        end

      what ->
        error "invalid access token found for #{access_token_id}, #{inspect what, pretty: true}"
        conn |> json(%{success: false,
                       message: "invalid access token id"})
    end
  end

  defp create_and_response_access_token(%Plug.Conn{} = conn, %User{} = user, app_id, device_id, platform, is_anonymous \\ false) do
    access_token = case conn.private[:acs_app] do
                    nil ->
                      Auth.create_access_token(%{
                        app_id: app_id,
                        user_id: user.id,
                        device_id: device_id,
                        platform: platform,
                        anonymous: is_anonymous,
                        ttl: 604800,
                        binding: %{}
                      })

                    %App{} = app ->
                      token = Auth.create_access_token(%{
                        app_id: app_id,
                        user_id: user.id,
                        device_id: device_id,
                        platform: platform,
                        anonymous: is_anonymous,
                        ttl: app.token_ttl,
                        binding: %{}
                      })

                      if app.restrict_login do
                        case CachedLoginCode.get(app.id, user.id) do
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
              expires_at: AccessToken.expired_at(access_token),
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
        case Auth.get_access_token(access_token_id) do
          %AccessToken{} = token ->
            Auth.del_access_token(token)
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

    case Auth.get_access_token(token_id) do
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
    case Auth.get_access_token(token_id) do
      nil ->
        conn |> json(%{success: false, message: "access token [#{token_id}] not found"})

      token ->
        case CachedUser.get(token.user_id) do
          nil ->
            conn |> json(%{success: false, message: "user not found"})

          user ->
            conn |> json(%{success: true, user: %{id: user.id, email: user.email}})
        end
    end
  end
  def get_token_user(conn, params) do 
    d "params: #{inspect params}"
    conn |> json(%{success: false})
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
    new_user = CachedUser.save(%{user | avatar_url: avatar_path})
    conn |> json(%{success: true, user: %{
      id: new_user.id,
      nickname: new_user.nickname,
      avatar_url: new_user.avatar_url,
      inserted_at: new_user.inserted_at
    }})
  end

  def search_users(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{
    "keyword" => "", "page" => page, "records_per_page" => records_per_page}) do
    query = %{
      query: %{
        has_child: %{
          child_type: "app_users",
          query:  %{term: %{app_id: app_id}}
        }
      },
      from: (page - 1) * records_per_page,
      size: records_per_page,
      sort: %{ inserted_at: %{ order: :desc} }
    }

    {:ok, total, ids} =  User.search(query)
    total_page = round(Float.ceil(total/records_per_page))
    users = get_users_by_ids(app_id, ids)

    conn |> json(%{success: true, total: total_page, users: users})
  end
  def search_users(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{
    "keyword" => keyword, "page" => page, "records_per_page" => records_per_page}) do
      query = %{
        query: %{
          bool: %{
            must: %{
              has_child: %{
                child_type: "app_users",
                query: %{
                  bool: %{
                    must: %{term: %{app_id: app_id}}
                  }
                },
            }},
            should: [
              %{term: %{id: keyword}},
              %{term: %{email: keyword}},
              %{term: %{mobile: keyword}},
              %{match: %{nickname: keyword}},
              %{has_child: %{
                child_type: "app_users",
                query: %{
                  bool: %{
                    should: [
                      %{match: %{game_user_name: keyword}},
                      %{term: %{game_user_id: keyword}}
                    ],
                    minimum_should_match: 1
                }}
              }}
            ],
            minimum_should_match: 1,
            boost: 1.0,
          },
        },
        from: (page - 1) * records_per_page,
        size: records_per_page,
      }

      {:ok, total, ids} =  User.search(query)
      total_page = round(Float.ceil(total/records_per_page))
      users = get_users_by_ids(app_id, ids)

      conn |> json(%{success: true, total: total_page, users: users})
  end

  def get_user_by_id(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"id" => id}) when is_integer(id) do
    user = get_users_by_ids(app_id, id)
    
    conn |> json(%{success: true, user: user})
  end

  defp get_users_by_ids(app_id, id) when is_integer(id) do
    get_users_by_ids(app_id, [id])
  end
  defp get_users_by_ids(app_id, ids \\ []) when is_list(ids) do
    case ids do
      [] -> 
        []
      ids_list ->
        users = Enum.map(ids, fn id -> RedisUser.find(id) end)
        |> Enum.filter(&(&1 != nil))
        |> Enum.map(fn user ->
            app_users_query =
              from app_user in AppUser,
                where: app_user.app_id == ^app_id and app_user.user_id == ^user.id,
                select: map(app_user, [:zone_id, :app_user_id, :app_user_name, :app_user_level, :active_seconds,
                  :pay_amount, :last_active_at, :inserted_at]),
                order_by: [asc: app_user.zone_id]
            app_users = StatsRepo.all(app_users_query)
            Map.put_new(Map.take(user, [:id, :email, :mobile, :gender, :nickname, :age, 
              :inserted_at]), :app_users, app_users)
          end)
      _ ->
        []
    end
  end

  def bind_login_code(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"login_code" => code}) do
    code = String.upcase(code)

    case CachedLoginCode.get(app_id, code) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.loginCodeNotExist"})

      %{code: ^code, owner: nil} ->
        conn |> json(%{success: false, i18n_message: "error.server.loginCodeNotExist"})

      %{code: ^code} = login_code ->
        case get_session(conn, :access_token) do
          nil ->
            conn |> json(%{success: false, i18n_message: "error.server.notLogin"})

          token_id ->
            case Auth.get_access_token(token_id) do
              nil ->
                conn |> json(%{success: false, i18n_message: "error.server.notLogin"})

              %{app_id: ^app_id, id: ^token_id, user_id: user_id} = access_token ->
                case login_code.user_id do
                  nil ->
                    now = DateTime.utc_now()
                    login_code = Repo.get_by(AppLoginCode, app_id: app_id, code: code)
                    AppLoginCode.changeset(login_code, %{user_id: user_id, used_at: now}) |> Repo.update!
                    CachedLoginCode.refresh(app_id, code)
                    CachedLoginCode.refresh(app_id, user_id)
                    access_token = %{access_token | login_code: code}
                    AccessToken.save(access_token)
                    response_access_token(conn, access_token)

                  ^user_id ->
                    CachedLoginCode.refresh(app_id, code)
                    CachedLoginCode.refresh(app_id, user_id)
                    access_token = %{access_token | login_code: code}
                    AccessToken.save(access_token)
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
    user = CachedUser.get(access_token.user_id)
    conn |> json(%{
            success: true,
            access_token: access_token.id,
            expires_at: AccessToken.expired_at(access_token),
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

  def import_data() do
    max_id = StatsRepo.one!( from user in AppUser, select: max(user.id))
    Enum.map_every(0..max_id, 100, fn current_id ->
      query =
        from app_user in AppUser,
        select: map(app_user, [:id, :app_id, :user_id, :app_user_id, :app_user_name, :app_user_level, :zone_id, :pay_amount, :inserted_at,
        :reg_date, :last_active_at, :last_paid_at, :first_paid_at, :platform, :updated_at]),
        where: app_user.id >= ^current_id,
        limit: 100,
        order_by: [app_user.id]
      users = StatsRepo.all(query)
      if users && users != [] do
        Enum.map(users, fn app_user ->
          case CachedUser.get(app_user.user_id) do
            %User{} = user ->
              Elasticsearch.index(%{index: "acs",
                type: "user",
                params: nil,
                id: user.id,
                doc: user})

              Elasticsearch.index(%{index: "acs",
                type: "app_users",
                params: %{parent: user.id},
                id: app_user.id,
                doc: %{
                  id: app_user.id,
                  app_id: app_user.app_id,
                  # app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5",
                  zone_id: app_user.zone_id,
                  game_user_id: app_user.app_user_id,
                  game_user_name: app_user.app_user_name,
                  game_user_level: app_user.app_user_level,
                  pay_amount:  app_user.pay_amount,
                  inserted_at: app_user.inserted_at,
                  reg_date: app_user.reg_date,
                  last_active_at: app_user.last_active_at,
                  last_paid_at: app_user.last_paid_at,
                  first_paid_at: app_user.first_paid_at,
                  platform: app_user.platform,
                  updated_at: app_user.updated_at
                }})
           _ ->
            :nothing
           end
        end)
       end
    end)
  end
end
