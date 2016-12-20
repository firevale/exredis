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
    plug :fetch_user_id
    plug :fetch_device_id
    plug :fetch_locale
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :parse_user_agent
    plug :fetch_user_id
    plug :fetch_device_id
    plug :fetch_locale
  end

  if Mix.env == :dev do 
    forward "/sent_emails", Bamboo.EmailPreviewPlug
  end

  scope "/", Acs do
    pipe_through :browser # Use the default browser stack

    get  "/", PageController, :index
    get  "/mobile/native_bridge/:platform", PageController, :show_native_bridge
    get  "/login/*path", PageController, :show_login_page
    get  "/admin/*path", PageController, :show_admin_page
    get  "/forum/*path", PageController, :show_forum_page
    post "/check_register_verify_code", VerifyCodeController, :check_register_verify_code
    post "/reset_register_captcha", VerifyCodeController, :reset_register_captcha 
    post "/send_mobile_register_verify_code", VerifyCodeController, :send_mobile_register_verify_code

    post "/check_retrieve_password_verify_code", VerifyCodeController, :check_retrieve_password_verify_code
    post "/send_retrieve_password_verify_code", VerifyCodeController, :send_retrieve_password_verify_code
  end
  
  scope "/user", Acs do
    pipe_through :browser # Use the default browser stack

    get  "/login", PageController, :show_login_page # 兼容旧的账号系统(for wp8 users)

    post "/create_token", UserController, :create_token 
    post "/create_anonymous_token", UserController, :create_anonymous_token 
    post "/create_user", UserController, :create_user
    post "/update_token", UserController, :update_token
    post "/update_password", UserController, :update_password # update(reset) password
    post "/is_account_exists", UserController, :is_account_exists
    post "/logout", UserController, :logout
  end

  scope path: "/api", alias: Acs do
    pipe_through :api

    get "/client/get_app_config", FVSdkController, :get_app_info
    get "/stat/report_activity", StatController, :report_activity

    forward "/auth", AuthApiRouter 
    forward "/user", UserApiRouter
    forward "/pay", PayRouter
    forward "/sdkpay", SdkPayRouter


  end # end scope ap

  # Other scopes may use custom stacks.
  # scope "/api", Acs do
  #   pipe_through :api
  # end


end
