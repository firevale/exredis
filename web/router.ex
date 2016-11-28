defmodule Acs.Router do
  use Acs.Web, :router

  if not Mix.env in [:dev, :test] do 
    use Plugsnag
  end
  
  import  Acs.Plugs

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :parse_user_agent
    plug :detect_user_id
    plug :detect_device_id
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :parse_user_agent
    plug :detect_user_id
    plug :detect_device_id
  end

  if Mix.env == :dev do 
    forward "/sent_emails", Bamboo.EmailPreviewPlug
  end

  scope "/", Acs do
    pipe_through :browser # Use the default browser stack

    get  "/", PageController, :index
    get  "/login.html", PageController, :show_login_page 
    get  "/admin.html", PageController, :show_admin_page

    post "/check_register_code", VerifyCodeController, :check_register_code
    post "/reset_register_captcha", VerifyCodeController, :reset_register_captcha 
    post "/send_mobile_register_verify_code", VerifyCodeController, :send_mobile_register_verify_code

    post "/check_reset_password_verify_code", VerifyCodeController, :check_reset_password_verify_code
    post "/send_mobile_reset_password_verify_code", VerifyCodeController, :send_mobile_reset_password_verify_code
  end
  
  scope "/admin", Acs do
    pipe_through :browser # Use the default browser stack

    get  "/login", AdminController, :index # show login page
    get  "/logout", AdminController, :logout
    get  "/reset_password", AdminController, :reset_password # show reset password page
    get  "/reset_password.html", AdminController, :reset_password # show reset password page
    get  "/reset_password_success", AdminController, :reset_password_success

    # ajax handlers
    post "/logout", AdminController, :logout
    post "/create_session", AdminController, :create_session
    post "/session_password", AdminController, :session_password
    post "/check_email_exists", AdminController, :check_email_exists
    post "/check_email_not_exists", AdminController, :check_email_not_exists
    post "/register", AdminController, :register # show reset password page
    post "/send_forgot_password_mail", AdminController, :send_forgot_password_mail
    get  "/show_reset_password", AdminController, :show_reset_password
    post "/reset_password", AdminController, :reset_password
  end

  scope "/user", Acs do
    pipe_through :browser # Use the default browser stack

    get  "/login", PageController, :show_login_page 

    post "/create_token", UserController, :create_token 
    post "/create_user", UserController, :create_user

    get  "/reset_password", UserController, :reset_password # show reset password page
    get  "/reset_password.html", UserController, :reset_password # show reset password page
    get  "/reset_password_success", UserController, :reset_password_success

    get  "/logout", UserController, :logout
    # ajax handlers
    post "/logout", UserController, :logout
    post "/create_session", UserController, :create_session
    post "/session_password", UserController, :session_password

    post "/is_account_exists", UserController, :is_account_exists
    post "/check_email_exists", UserController, :check_email_exists
    post "/check_email_not_exists", UserController, :check_email_not_exists
    post "/register", UserController, :register # show reset password page
    post "/send_forgot_password_mail", UserController, :send_forgot_password_mail
    get  "/show_reset_password", UserController, :show_reset_password
    post "/reset_password", UserController, :reset_password
  end

  scope path: "/api", alias: Acs do
    pipe_through :api

    scope path: "/auth" do 
      post "/gen_token",        Api.AuthController, :gen_token     
      get  "/bind_token",       Api.AuthController, :bind_token
      get  "/guest_token",      Api.AuthController, :guest_token
      get  "/anonymous_token",  Api.AuthController, :anonymous_token
      post "/verify_token",     Api.AuthController, :verify_token
      get  "/verify_token",     Api.AuthController, :verify_token
      get  "/update_token",     Api.AuthController, :update_token
      post "/update_token",     Api.AuthController, :update_token
      get  "/create_token",     Api.AuthController, :create_token
    end

    scope path: "/user" do 
      get "/check_user_exists",            Api.UserController, :check_user_exists     
      get "/bind_anonymous/:user_id",      Api.UserController, :bind_anonymous
      get "/send_forgot_password_token",   Api.UserController, :send_forgot_password_token
      get "/check_forgot_password_token",  Api.UserController, :check_forgot_password_token
      get "/reset_password",               Api.UserController, :reset_password
      get "/email_regist",                 Api.UserController, :email_regist
    end

    scope path: "/client" do 
      get "/get_app_config", Api.AppController, :get_app_info
    end

    scope path: "/pay" do 
      get  "/add_applestore_order",     AppleStoreController, :add_order
      post "/add_applestore_order",     AppleStoreController, :add_order
      get  "/deliver_applestore_order", AppleStoreController, :deliver_order
      get  "/deliver_ggplay_order",     GgplayController,     :verify_and_deliver
    end 

    scope path: "/sdkpay", alias: SdkPay do
      get  "/add_channel_order", AppOrderController, :add_order
      get  "/add_meizu_order",   AppOrderController, :add_meizu_order
      get  "/add_vivo_order",    AppOrderController, :add_vivo_order

      get  "/:sdk/:client_id",   PurchaseCallbackController, :dispatch_callback
      post "/:sdk/:client_id",   PurchaseCallbackController, :dispatch_callback 
    end

    scope path: "/alipay" do
      post  "/redirect", AlipayController, :alipay_redirect, as: :redirect
      get   "/redirect", AlipayController, :alipay_redirect, as: :redirect

      get   "/notify",   AlipayController, :notify
      post  "/notify",   AlipayController, :notify
      get   "/callback", AlipayController, :callback
    end    

    scope path: "/stat" do 
      get   "/report_activity", StatController, :report_activity
    end 

  end # end scope ap

  # Other scopes may use custom stacks.
  # scope "/api", Acs do
  #   pipe_through :api
  # end


end
