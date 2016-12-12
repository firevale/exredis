defmodule Acs.UserController do
  use Acs.Web, :controller

  plug :fetch_app_id
  plug :fetch_app
  
  def is_account_exists(conn, %{"account_id" => ""}) do 
    conn |> json(%{exists: false})
  end
  def is_account_exists(conn, %{"account_id" => account_id}) do 
    conn |> json(%{exists: RedisUser.exists?(account_id)})
  end

  def create_token(conn, %{"account_id" => "", "password" => _password}) do 
    conn |> json(%{success: false, message: "invalid account id"})
  end
  def create_token(%Plug.Conn{private: %{acs_app_id: app_id, 
                                         acs_device_id: device_id,
                                         acs_platform: platform}} = conn, 
                   %{"account_id" => account_id, "password" => password}) do 
    d "acs_app_id: #{app_id}, acs_device_id: #{device_id}, acs_platform: #{platform}"
    if RedisUser.exists?(account_id) do 
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
                 |> json(%{success: false, message: "account.error.passwordNotMatch"})
        end
      else
        conn |> json(%{success: false, message: "account.error.tooManyFails"})
      end
    else 
      conn |> json(%{success: false, message: "account.error.accountNotExist"})
    end  
  end

  def create_user(conn, %{"verify_code" => ""}) do 
      conn |> json(%{success: false, message: "account.error.emptyVerifyCode"})
  end
  def create_user(%Plug.Conn{private: %{acs_app_id: app_id, 
                                        acs_device_id: device_id,
                                        acs_platform: platform}} = conn, 
                   %{"account_id" => account_id, "password" => password, "verify_code" => verify_code}) do 
    if RedisUser.exists?(account_id) do 
      conn |> json(%{success: false, message: "account.error.accountInUse"})
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
            RedisUser.save!(user)
            create_and_response_access_token(conn, user, app_id, device_id, platform)          
          else 
            conn |> json(%{success: false, message: "account.error.accountIdChanged"})
          end
        _ ->
          conn |> json(%{success: false, message: "account.error.invalidVerifyCode"})
      end
    end
  end

  def update_password(conn, %{"account_id" => account_id, "verify_code" => verify_code, "password" => password}) do 
    case RedisUser.find(account_id) do 
      nil ->
        conn |> json(%{success: false, message: "account.error.accountNotFound"})
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
                conn |> json(%{success: false, message: "account.error.invalidVerifyCode"})
            end
          _ ->
            conn |> json(%{success: false, message: "account.error.accountIdChanged"})
       end
    end
  end

  def create_anonymous_token(%Plug.Conn{private: %{acs_app_id: app_id, 
                                                   acs_device_id: device_id, 
                                                   acs_platform: platform}} = conn, _) do 
    d "acs_app_id: #{app_id}, acs_device_id: #{device_id}, acs_platform: #{platform}"
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
        Logger.error "access token not found for #{access_token_id}"
        conn |> json(%{success: false, 
                       message: "access token not found"})

      %RedisAccessToken{app_id: ^app_id, device_id: ^device_id, user_id: user_id} = token ->
        d "update_token, old token found, #{inspect token, pretty: true}"
        case RedisUser.find(user_id) do 
          nil ->
            conn |> json(%{success: false, 
                           message: "token user not exists!"})
          %RedisUser{} = user ->
            RedisAccessToken.delete(token)
            is_anonymous = case user.nickname do 
                             "anonymous" -> true
                             _ -> false
                           end
                          
            create_and_response_access_token(conn, user, app_id, device_id, platform, is_anonymous)
        end
      
      what ->
        Logger.error "invalid access token found for #{access_token_id}, #{inspect what, pretty: true}"
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
               nick_name: 
               if is_anonymous do  
                 gettext("anonymous") <> "-" <> (user.id |> :binary.encode_unsigned |> Base.encode32(padding: false, case: :lower))
               else 
                user.nickname || ""
               end,
               is_anonymous: is_anonymous,
               sdk: :firevale,
               binding: %{} 
             })
  end


  def logout(conn, _params) do 
    case get_session(conn, :access_token) do 
      nil ->
        # not logged in
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
end