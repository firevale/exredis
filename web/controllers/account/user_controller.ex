defmodule Acs.UserController do
  use Acs.Web, :controller
  @static_page_root            Application.get_env(:acs, :static_page_root, "/") 
  
  plug :detect_platform
  plug :detect_user_key
  plug :no_cache

  def index(conn, params) do
    # get redirect url from params
    decoded_redirect_url = case params["redirect_url"] do 
                              nil -> "/"
                              "" -> "/"
                              v -> v |> Base.url_decode64!
                            end
    login_manifests =  %{
      "phoneSupport" => true,
      "login_commons.js" => Path.join(@static_page_root, "/js/login_commons.js"),
      "login.js" => Path.join(@static_page_root, "/js/login.js"),
      "login.css" => Path.join(@static_page_root, "/css/login.css")            
    }                         
    conn |> put_layout(false) 
         |> render("login.html", params: params, redirect_url: decoded_redirect_url, login_manifests: login_manifests)
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