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
    get  "/mall/*path", PageController, :show_mall_page
    get  "/payment/*path", PageController, :show_payment_page
    post "/check_register_verify_code", VerifyCodeController, :check_register_verify_code
    post "/reset_register_captcha", VerifyCodeController, :reset_register_captcha 
    post "/send_mobile_register_verify_code", VerifyCodeController, :send_mobile_register_verify_code

    post "/check_retrieve_password_verify_code", VerifyCodeController, :check_retrieve_password_verify_code
    post "/send_retrieve_password_verify_code", VerifyCodeController, :send_retrieve_password_verify_code

    # 兼容wp8 
    get "/auth/authorization_token", PageController, :show_login_page

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

    # 接受 “火谷小帮手” 超信机器人 消息
    post "/chaoxin/receive_bot_msg", ChaoxinController, :receive_bot_msg

    get "/client/get_app_config", FVSdkController, :get_app_info
    get "/stat/report_activity", FVSdkController, :report_activity

    scope path: "/alipay" do
      post  "/redirect", AlipayController, :alipay_redirect, as: :redirect
      get   "/redirect", AlipayController, :alipay_redirect, as: :redirect

      get   "/notify",   AlipayController, :notify
      post  "/notify",   AlipayController, :notify
      get   "/callback", AlipayController, :callback
    end  

    scope path: "/wechat" do
      get  "/prepay", WechatController, :prepay
      post  "/prepay", WechatController, :prepay
      get  "/callback", WechatController, :callback
      
      get  "/notify", WechatController, :notify
      post  "/notify",   AlipayController, :notify
    end 

    forward "/auth", AuthApiRouter 
    forward "/user", UserApiRouter
    forward "/pay", PayRouter
    forward "/sdkpay", SdkPayRouter

  end # end scope ap

  scope path: "/admin_actions", alias: Acs do 
    forward "/", AdminRouter
  end

  # Other scopes may use custom stacks.
  # scope "/api", Acs do
  #   pipe_through :api
  # end


end
