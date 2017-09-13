defmodule AcsWeb.Router do
  use AcsWeb, :router
  
  scope "/", AcsWeb do
    pipe_through :browser # Use the default browser stack

    get  "/", PageController, :index
    get  "/login/*path", PageController, :show_login_page
    get  "/admin/app/:app_id/*path", PageController, :show_admin_app_page
    get  "/admin/*path", PageController, :show_admin_page
    get  "/forum", PageController, :show_forum_page
    get  "/forum/index", PageController, :show_forum_page
    get  "/forum/:forum_id/*path", PageController, :show_forum_page

    get  "/bbs", PageController, :show_bbs_page
    get  "/bbs/index", PageController, :show_bbs_page
    get  "/bbs/:forum_id/*path", PageController, :show_bbs_page

    get  "/show_app_forum", PageController, :show_app_forum
    get  "/show_app_mall", PageController, :show_app_mall
    get  "/show_app_games", PageController, :show_app_games
    get  "/show_app_faq", PageController, :show_app_faq
    get  "/customerService/*path", PageController, :show_customer_service_page
    get  "/games/*path", PageController, :show_games_page
    get  "/mall/*path",  PageController, :show_mall_page
    get  "/account/*path", PageController, :show_account_page
    get  "/payment/*path", PageController, :show_payment_page

    get  "/img/*path", ImageController, :get_image

    post "/check_register_verify_code", VerifyCodeController, :check_register_verify_code
    post "/reset_register_captcha", VerifyCodeController, :reset_register_captcha
    post "/send_mobile_register_verify_code", VerifyCodeController, :send_mobile_register_verify_code
    post "/send_mobile_bind_verify_code", VerifyCodeController, :send_mobile_bind_verify_code
    post "/send_email_bind_verify_code", VerifyCodeController, :send_email_bind_verify_code
    post "/check_retrieve_password_verify_code", VerifyCodeController, :check_retrieve_password_verify_code
    post "/send_retrieve_password_verify_code", VerifyCodeController, :send_retrieve_password_verify_code
  end

  scope "/user", AcsWeb do
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
    post "/bind_login_code", UserController, :bind_login_code
    post "/generate_state", UserController, :generate_wechat_login_state
  end

  scope "/auth", AcsWeb do
    pipe_through :browser # Use the default browser stack

    # 兼容wp8
    get  "/authorization_token", UserController, :authorization_token
    get  "/verify_token", UserController, :verify_token
    post "/verify_token", UserController, :verify_token
  end

  scope "/api", AcsWeb do
    pipe_through :api

    # 接受 “火谷小帮手” 超信机器人 消息
    post "/chaoxin/receive_bot_msg", ChaoxinController, :receive_bot_msg

    get "/client/get_app_config", FVSdkController, :get_app_info
    get "/stat/report_activity", FVSdkController, :report_activity

    forward "/auth", AuthApiRouter
    forward "/user", UserApiRouter
    forward "/pay", PayRouter
    forward "/sdkpay", SdkPayRouter

    scope "/alipay" do
      get   "/redirect", AlipayController, :alipay_redirect
      post  "/redirect", AlipayController, :alipay_redirect

      get   "/notify",   AlipayController, :notify
      post  "/notify",   AlipayController, :notify
    end

    scope "/wcp" do 
      get  "/:app_id", WcpController, :index
      post "/:app_id", WcpController, :on_receive_message
    end

    scope "/wcjs" do 
      get "/:app_id/signature", WcjsController, :signature
    end
  end # end scope ap

  scope "/cron", AcsWeb do
    get "/notify_cp", CronController, :notify_cp
    get "/report_sms_amount", CronController, :report_sms_amount
    get "/cancel_mall_order", CronController, :cancel_mall_order
    get "/finish_mall_order", CronController, :finish_mall_order
    get "/save_online_counter", CronController, :save_online_counter
    get "/save_hourly_online_counter", CronController, :save_hourly_online_counter
    get "/daily_refresh", CronController, :daily_refresh
    get "/daily_report", CronController, :daily_report
    get "/tinify_schedule", CronController, :tinify_schedule
  end

  scope "/admin_actions", AcsWeb do
    forward "/", AdminRouter
  end

  scope "/forum_actions", AcsWeb do
    forward "/", ForumRouter
  end

   scope "/customer_service_actions", AcsWeb do
    forward "/", CustomerServiceRouter
  end

  scope "/games_actions", AcsWeb do
    forward "/", GamesRouter
  end

  scope "/mall_actions", AcsWeb do
    forward "/", MallRouter
  end

  # Other scopes may use custom stacks.
  # scope "/api", AcsWeb do
  #   pipe_through :api
  # end
end
