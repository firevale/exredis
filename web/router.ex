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
    plug :fetch_user
    plug :fetch_device_id
    plug :fetch_locale
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :parse_user_agent
    plug :fetch_user_id
    plug :fetch_user
    plug :fetch_device_id
    plug :fetch_locale
  end

  if Mix.env == :dev do
    forward "/sent_emails", Bamboo.EmailPreviewPlug
  end

  scope "/", Acs do
    pipe_through :browser # Use the default browser stack

    get  "/", PageController, :index
    get  "/login/*path", PageController, :show_login_page
    get  "/admin/*path", PageController, :show_admin_page
    get  "/forum", PageController, :show_forum_page
    get  "/forum/index", PageController, :show_forum_page
    get  "/forum/:forum_id/*path", PageController, :show_forum_page
    get  "/customerService/*path", PageController, :show_customer_service_page
    get  "/games/*path", PageController, :show_games_page
    get  "/mall/*path",  PageController, :show_mall_page
    get  "/account/*path", PageController, :show_account_page
    get  "/payment/*path", PageController, :show_payment_page

    post "/check_register_verify_code", VerifyCodeController, :check_register_verify_code
    post "/reset_register_captcha", VerifyCodeController, :reset_register_captcha
    post "/send_mobile_register_verify_code", VerifyCodeController, :send_mobile_register_verify_code
    post "/send_mobile_bind_verify_code", VerifyCodeController, :send_mobile_bind_verify_code
    post "/send_email_bind_verify_code", VerifyCodeController, :send_email_bind_verify_code
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
    post "/update_mobile", UserController, :update_mobile # update(reset) password
    post "/update_email", UserController, :update_email # update(reset) password
    post "/update_nickname", UserController, :update_nickname # update(reset) password
    post "/update_avatar", UserController, :update_avatar # update(reset) password
    post "/update_resident_info", UserController, :update_resident_info # update(reset) password
    post "/is_account_exists", UserController, :is_account_exists
    post "/logout", UserController, :logout
  end

  scope "/auth", Acs do
    pipe_through :browser # Use the default browser stack

    # 兼容wp8
    get  "/authorization_token", UserController, :authorization_token
    get  "/verify_token", UserController, :verify_token
    post "/verify_token", UserController, :verify_token
  end

  scope path: "/api", alias: Acs do
    pipe_through :api

    # 接受 “火谷小帮手” 超信机器人 消息
    post "/chaoxin/receive_bot_msg", ChaoxinController, :receive_bot_msg

    get "/client/get_app_config", FVSdkController, :get_app_info
    get "/stat/report_activity", FVSdkController, :report_activity

    forward "/auth", AuthApiRouter
    forward "/user", UserApiRouter
    forward "/pay", PayRouter
    forward "/sdkpay", SdkPayRouter

    scope path: "/alipay" do
      get   "/redirect", AlipayController, :alipay_redirect
      post  "/redirect", AlipayController, :alipay_redirect

      get   "/notify",   AlipayController, :notify
      post  "/notify",   AlipayController, :notify
    end
  end # end scope ap

  scope path: "/cron", alias: Acs do
    get "/notify_cp", CronController, :notify_cp
    get "/report_sms_amount", CronController, :report_sms_amount
  end

  scope path: "/admin_actions", alias: Acs do
    forward "/", AdminRouter
  end

  scope path: "/forum_actions", alias: Acs do
    forward "/", ForumRouter
  end

   scope path: "/customer_service_actions", alias: Acs do
    forward "/", CustomerServiceRouter
  end

  scope path: "/games_actions", alias: Acs do
    forward "/", GamesRouter
  end

  scope path: "/mall_actions", alias: Acs do
    forward "/", MallRouter
  end
end
