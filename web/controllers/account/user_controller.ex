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
  
    case get_session(conn, :register_verify_code) do 
      ^verify_code ->
        user = RedisUser.create!(account_id, password)  
        RedisUser.save!(user)
        create_and_response_access_token(conn, user, app_id, device_id, platform)          
      _ ->
        conn |> json(%{success: false, message: "account.error.invalidVerifyCode"})
    end
  end

  def update_password(conn, %{"account_id" => account_id, "verify_code" => verify_code, "password" => password}) do 
    case RedisUser.find(account_id) do 
      nil ->
        conn |> json(%{success: false, message: "account.error.accountNotFound"})
      %RedisUser{} = user ->
        case get_session(conn, :retrieve_password_verify_code) do 
          ^verify_code ->
            user = %{user | encrypted_password: Utils.hash_password(password)}
            RedisUser.save!(user)
            conn |> delete_session(:retrieve_password_verify_code) 
                 |> json(%{success: true})
          _ ->
            conn |> json(%{success: false, message: "account.error.invalidVerifyCode"})
        end
    end
  end

  defp create_and_response_access_token(%Plug.Conn{} = conn, %RedisUser{} = user, app_id, device_id, platform) do 
    access_token = case conn.private[:acs_app] do 
                    nil -> 
                      RedisAccessToken.new(%{
                        app_id: app_id,
                        user_id: user.id,
                        device_id: device_id,
                        platform: platform,
                        ttl: 604800,
                        binding: %{}
                      })
                    %RedisApp{} = app ->
                      RedisAccessToken.new(%{
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
           |> json(%{
               success: true,
               access_token: access_token.id,
               expires_at: RedisAccessToken.expired_at(access_token),
               user_id: user.id,
               user_email: user.email,
               nick_name:  user.nickname,
               is_anonymous: false,
               sdk: :firevale,
               binding: %{} 
             })
  end

 

  # def logout(conn, params) do 
  #   conn |> text "logout"
  # end

  # # ajax handler, create session  
  # def create_session(conn, %{"email" => email, "password" => password}) do 
  #   if User.exists?(email) do
  #     case User.authenticate(email, password) do
  #       {:ok, user} ->
  #         conn |> put_session(:user_id, user.id)
  #              |> put_session(:user_password, password) 
  #              |> put_session(:user_email, user.email)
  #              |> delete_session(:failed_attempts)
  #              |> json(%{success: true, user_id: user.id})
  #       _ ->
  #         Logger.error "authenticate user[#{email}] failed...."
  #         failed_attempts = get_session(conn, :failed_attempts) || 0
  #         conn |> put_session(:failed_attempts, failed_attempts + 1)
  #              |> json(%{success: false, failed_attempts: failed_attempts + 1})
  #     end
  #   else
  #     Logger.error "email #{email} is not an existing account..."
  #     conn |> json(%{success: false})
  #   end
  # end

  # # ajax handler, register new user
  # def register(conn, params) do
  #   device_id = get_session(conn, :device_id) || ""

  #   case User.create(params["email"], params["password"], device_id) do
  #     user = %User{} ->
  #       user = User.save!(user)

  #       conn |> put_session(:user_id, user.id)
  #            |> put_session(:user_email, user.email)
  #            |> put_session(:user_mobile, user.mobile)
  #            |> put_session(:user_password, params["password"]) 
  #            |> delete_session(:failed_attempts)
  #            |> json(%{success: true, user_id: user.id})

  #     error ->
  #       Logger.error "create user with #{params["email"]}, #{device_id} failed: #{error}"
  #       conn |> json(%{success: false}) 
  #   end
  # end

  # # ajax handler, send forgort password mail
  # def send_forgot_password_mail(conn, params) do
  #   case User.find(params["email"]) do
  #     nil ->
  #       conn |> json(%{success: false})
  #     user ->
  #       access_token = AccessToken.new("", user.id, "", [], 86400)
  #       :ok = AccessToken.save(access_token)

  #       query_string = URI.encode_query %{:token => access_token.id, :email => user.email, :locale => params["locale"]}

  #       reset_url = "http://#{conn.host}/user/show_reset_password?" <> query_string

  #       case EmailService.send_resetpassword_url(%{to: user,
  #                                                  subject: params["subject"],
  #                                                  url: reset_url, 
  #                                                  locale: params["locale"]}) do 
  #         :ok ->
  #           conn |> json(%{success: true})
  #         :error ->
  #           conn |> json(%{success: false})
  #       end
  #   end
  # end

  # # show reset password page via get (through reset password email)
  # def show_reset_password(conn, params) do
  #   case User.find!(params["email"]) do
  #     :undefined ->
  #       Logger.error "user[#{params["email"]}] not found"
  #       conn |> put_status(403) |> json(%{success: false, message: "invalid email"})
  #     user ->
  #       case AccessToken.find(params["token"]) do
  #         :undefined ->
  #           Logger.error "token[#{params["token"]}] not found"
  #           conn |> put_status(403) |> json(%{success: false, message: "invalid token"})
  #         access_token ->
  #           if access_token.resource_owner_id == user.id do
  #             conn |> render("reset_password.html", secure_host: HostHelper.secure_host(conn),
  #                                                   csrf_token: get_csrf_token,
  #                                                   user_email: user.email,
  #                                                   locale: params["locale"],
  #                                                   redirect_url: "/user/reset_password_success?locale=#{params["locale"]}")
  #           else
  #             Logger.error "token not match\n#{inspect access_token}\n#{inspect user}\n"
  #             conn |> put_status(403) |> json(%{success: false, message: "invalid token"})
  #           end
  #       end
  #   end
  # end

  # def reset_password(conn, params) do
  #   case User.find!(params["email"]) do
  #     :undefined ->
  #       Logger.error "user[#{params["email"]}] not found"

  #       conn |> json(%{success: false, message: "email not found"})
  #     user ->
  #       case AccessToken.find(params["token"]) do
  #         :undefined ->
  #           Logger.error "token[#{params["token"]}] not found"
  #           conn |> json(%{success: false, message: "token expired"})
  #         access_token ->
  #           if access_token.resource_owner_id == user.id do
  #             user = %{user | encrypted_password: PasswordUtils.hashpass(params["password"])}
  #             User.save!(user)
  #             AccessToken.delete(access_token.id)

  #             conn |> put_session(:user_id, user.id)
  #                  |> put_session(:user_email, user.email)
  #                  |> put_session(:failed_attempts, 0)
  #                  |> json(%{success: true})
  #           else
  #             Logger.error "token not match\n#{inspect access_token}\n#{inspect user}\n"
  #             conn |> json(%{success: false, message: "invalid token"})
  #           end
  #       end
  #   end
  # end

  # def reset_password_success(conn, params) do
  #   conn |> render("reset_password_success.html", locale: params["locale"])
  # end

  # # ajax handler, get saved password via secure connection
  # def session_password(conn, _params) do 
  #   conn |> text(get_session(conn, :user_password) || "")
  # end

  # # ajax handler, check if email is registered
  # def check_email_exists(conn, params) do
  #   if is_nil(params["email"]) do 
  #     text conn, "false"
  #   else 
  #     text conn, "#{User.exists?(params["email"])}"
  #   end
  # end

  # # ajax handler, check if email is not registered
  # def check_email_not_exists(conn, params) do
  #   if is_nil(params["email"]) do 
  #     text conn, "false"
  #   else 
  #     text conn, "#{not User.exists?(params["email"])}"
  #   end
  # end

end