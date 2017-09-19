defmodule AcsWeb.UserController do
  use AcsWeb, :controller

  alias Utils.Password
  alias Acs.LoginCodes

  plug :fetch_app_id
  plug :fetch_app
  plug :fetch_user_id
  plug :fetch_session_user_id
  plug :fetch_session_user

  def is_account_exists(conn, %{"account_id" => ""}) do
    conn |> json(%{success: true, exists: false})
  end
  def is_account_exists(conn, %{"account_id" => account_id}) do
    conn |> json(%{success: true, exists: Accounts.exists?(account_id)})
  end
  def is_account_exists(conn, %{"key" => account_id}) do
    conn |> json(%{success: true, exists: Accounts.exists?(account_id)})
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
    case Accounts.get_user(account_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.accountNotExist"})

      %User{} ->
        now = Utils.unix_timestamp()
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
    if Accounts.exists?(account_id) do
      conn |> json(%{success: false, i18n_message: "error.server.accountInUse"})
    else
      case Accounts.bind_anonymous_user(device_id, account_id, password) do
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
    if Accounts.exists?(account_id) do
      conn |> json(%{success: false, i18n_message: "error.server.accountInUse"})
    else
      user = Accounts.create_user!(account_id, password)
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
    if Accounts.exists?(account_id) do
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
            user = Accounts.create_user!(account_id, password)
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
    case Accounts.get_user(account_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.accountNotFound"})

      %User{} = user ->
        case get_session(conn, :retrieve_password_account_id) do
          ^account_id ->
            case get_session(conn, :retrieve_password_verify_code) do
              ^verify_code ->
                Accounts.update_user!(user, %{
                  encrypted_password: Password.hash(password)
                })
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
        case Accounts.get_user(mobile) do
          nil -> 
            _update_mobile(conn, user, mobile)
          %{id: ^user_id} -> 
            _update_mobile(conn, user, mobile)
          _ -> 
            conn |> json(%{success: false, i18n_message: "error.server.mobileInUse"})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.invalidVerifyCode"})
    end
  end
  def update_mobile(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  defp _update_mobile(conn, user, mobile) do
    attr = %{
      mobile: mobile,
      device_id: nil,
    }
    attr = if is_bitstring(conn.params["password"]) and String.length(conn.params["password"]) >= 6 do
      Map.put(attr, :encrypted_password, Password.hash(conn.params["password"]))
    else
      user
    end
    Accounts.update_user!(user, attr)
    conn |> delete_session(:bind_mobile_verify_code)
         |> delete_session(:bind_mobile_account_id)
         |> json(%{success: true})
  end

  def update_email(%Plug.Conn{private: %{acs_session_user: %{id: user_id} = user}} = conn,
                   %{"email" => email, "verify_code" => verify_code}) do
    case get_session(conn, :bind_email_verify_code) do
      ^verify_code ->
        case Accounts.get_user(email) do
          nil -> 
            _update_email(conn, user, email)
          %{id: ^user_id} -> 
            _update_email(conn, user, email)
          _ -> 
            conn |> json(%{success: false, i18n_message: "error.server.emailInUse"})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.invalidVerifyCode"})
    end
  end
  def update_email(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  defp _update_email(conn, user, email) do
    attr = %{
      email: email,
      device_id: nil,
    }
    attr = if is_bitstring(conn.params["password"]) and String.length(conn.params["password"]) >= 6 do
      Map.put(attr, :encrypted_password, Password.hash(conn.params["password"]))
    else
      user
    end
    Accounts.update_user!(user, attr)
    conn |> delete_session(:bind_email_verify_code)
         |> delete_session(:bind_email_account_id)
         |> json(%{success: true})
  end

  def update_nickname(%Plug.Conn{private: %{acs_session_user: %{id: user_id} = user}} = conn,
                      %{"nickname" => nickname}) do
    check_out = check_nickname(nickname)
    if check_out && !check_out.success do
      conn |> json(check_out)
    else
      if Accounts.is_nickname_exists?(nickname, user_id) do
        conn |> json(%{success: false, i18n_message: "error.server.nicknameInUse"})  
      else 
        Accounts.update_user!(user, %{nickname: nickname})
        conn |> json(%{success: true})
      end
    end
  end
  def update_nickname(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def update_resident_info(%Plug.Conn{private: %{acs_session_user: %{id: _user_id} = user}} = conn,
                           %{"resident_id" => resident_id, "resident_name" => resident_name}) do
    Accounts.update_user!(user, %{resident_id: resident_id, resident_name: resident_name})
    conn |> json(%{success: true})
  end
  def update_resident_info(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def create_anonymous_token(%Plug.Conn{private: %{acs_app_id: app_id,
                                                   acs_device_id: device_id,
                                                   acs_platform: platform}} = conn, _) do
    user = Accounts.fetch_anonymous_user(device_id)
    create_and_response_access_token(conn, user, app_id, device_id, platform, true)
  end

  def update_token(%Plug.Conn{private: %{acs_app_id: app_id,
                                         acs_device_id: device_id,
                                         acs_platform: platform}} = conn,
                   %{"access_token" => access_token_id}) do
    case Auth.get_access_token(access_token_id) do
      nil ->
        error "access token not found for #{access_token_id}"
        conn |> json(%{success: false,
                       message: "access token not found"})

      %AccessToken{app_id: ^app_id, device_id: ^device_id, user_id: user_id} = token ->
        case Accounts.get_user(user_id) do
          nil ->
            conn |> json(%{success: false,
                           message: "token user not exists!"})
          %User{} = user ->
            Auth.del_access_token(token)
            create_and_response_access_token(conn, user, app_id, device_id, platform, !is_nil(user.device_id))
        end
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
                        case LoginCodes.get_login_code(app.id, user_id: user.id) do
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
        case Crypto.md5_sign("#{token_id}#{app.secret}") do
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
        case Accounts.get_user(token.user_id) do
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
    {:ok, avatar_url} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "user_avatars")
    new_user = Accounts.update_user!(user, %{avatar_url: avatar_url})
    conn |> json(%{success: true, user: %{
      id: new_user.id,
      nickname: new_user.nickname,
      avatar_url: new_user.avatar_url,
      inserted_at: new_user.inserted_at
    }})
  end

  def bind_login_code(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"login_code" => code}) do
    code = String.upcase(code)

    case LoginCodes.get_login_code(app_id, code: code) do
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
                    LoginCodes.update_login_code!(login_code, %{
                      user_id: user_id
                    })
                    access_token = %{access_token | login_code: code}
                    AccessToken.save(access_token)
                    response_access_token(conn, access_token)

                  ^user_id ->
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

  def get_user_addresses(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,_)do
    addresses = Accounts.get_user_addresses(user_id)
    conn |> json(%{success: true, addresses: addresses})
  end

  def delete_address(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,%{"address_id" => address_id}) do
    case Accounts.delete_address(user_id, address_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.addressNotFound"})
      :ok ->
        conn |> json(%{success: true, i18n_message: "mall.address.deleteSuccess"})
      {:error, errors} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
      :badrequest ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end

  def set_default_address(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,%{"address_id" => address_id})do
    case Accounts.set_default_address(user_id, address_id) do
      :zero ->
        conn |> json(%{success: false, i18n_message: "error.server.addressNotFound"})
      :ok ->
        conn |>json(%{success: true, i18n_message: "mall.address.setDefaultSuccess"})
    end
  end

  def get_default_address(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, _) do
    case Accounts.get_default_address(user_id) do
      nil ->
        conn |> json(%{success: false})
      {:ok, address} ->
        conn |> json(%{success: true, address: address})
    end
  end

  def get_address_detail(%Plug.Conn{private: %{acs_session_user_id: _user_id}} = conn,%{"address_id" => address_id}) do
    case Accounts.get_address_detail(address_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.addressNotFound"})
      {:ok, address} ->
        conn |> json(%{success: true, address: address})
    end
  end

  def insert_address(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, %{
                "name" => _name,
                "mobile" => _mobile,
                "area" => _area,
                "address" => _address,
                "area_code" => _area_code} = us_address)do
    case Accounts.insert_address(user_id, us_address) do
      {:ok, us_address} ->
        conn |> json(%{success: true, address: us_address, i18n_message: "mall.address.addSuccess"})
      :error ->
        conn |> json(%{success: false, i18n_message: "error.server.networkError"})
    end
  end

  def update_address(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, %{
                                          "id" => _id,
                                          "name" => _name,
                                          "mobile" => _mobile,
                                          "area" => _area,
                                          "address" => _address,
                                          "area_code" => _area_code,
                                          "is_default" => _is_default} = address)do
    case Accounts.update_address(user_id, address) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.addressNotFound"})
      :illegal ->
        conn |> json(%{success: false, i18n_message: "error.server.illegal"})
      :ok ->
        conn |> json(%{success: true, i18n_message: "mall.address.updateSuccess"})
    end
  end

  defp response_access_token(conn, access_token) do
    user = Accounts.get_user(access_token.user_id)
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
  defp check_nickname(userid) do
    # %{success: true}
    case NeteaseDun.check_userid(userid) do
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
