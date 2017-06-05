
defmodule Acs.AuthApiRouter do
  use Acs.Web, :router

  # "/api/auth forward from main router"
  scope "/", Acs do
    pipe_through :auth_user_api

    get "/bind/anzhi", AnzhiAuthBind, :bind
    get "/bind/baidu", BaiduAuthBind, :bind
    get "/bind/cc", CCPlayAuthBind, :bind
    get "/bind/coolpad", CoolpadAuthBind, :bind
    get "/bind/downjoy", DownjoyAuthBind, :bind
    get "/bind/facebook", FacebookAuthBind, :bind
    get "/bind/firevale", FacebookAuthBind, :bind # bind facebook
    get "/bind/gfan", GFanAuthBind, :bind
    get "/bind/haima", HaimaAuthBind, :bind
    get "/bind/htc", HtcAuthBind, :bind
    get "/bind/huawei", HtcAuthBind, :bind
    get "/bind/i4", I4AuthBind, :bind
    get "/bind/iiapple", IIAppleAuthBind, :bind
    get "/bind/itools", ItoolsAuthBind, :bind
    get "/bind/iyouxi", IYouxiAuthBind, :bind
    get "/bind/ky", KYAuthBind, :bind
    get "/bind/lenovo", LenovoAuthBind, :bind
    get "/bind/meizu", MeizuAuthBind, :bind
    get "/bind/mumayi", MumayiAuthBind, :bind
    get "/bind/ndcom", NdcomAuthBind, :bind
    get "/bind/oppo", OppoAuthBind, :bind
    get "/bind/pp", PPAuthBind, :bind
    get "/bind/qh360", Qh360AuthBind, :bind
    get "/bind/qxz", QxzAuthBind, :bind
    get "/bind/sogou", SogouAuthBind, :bind
    get "/bind/tbt", TBTAuthBind, :bind
    get "/bind/uc", UCAuthBind, :bind
    get "/bind/vivo", VivoAuthBind, :bind
    get "/bind/wdj", WandoujiaAuthBind, :bind
    get "/bind/xiaomi", XiaomiAuthBind, :bind
    get "/bind/xy", XYAuthBind, :bind
    get "/bind/youku", YoukuAuthBind, :bind
    get "/bind/yyh", YYHAuthBind, :bind

    post "/bind/anzhi", AnzhiAuthBind, :bind
    post "/bind/baidu", BaiduAuthBind, :bind
    post "/bind/cc", CCPlayAuthBind, :bind
    post "/bind/coolpad", CoolpadAuthBind, :bind
    post "/bind/downjoy", DownjoyAuthBind, :bind
    post "/bind/facebook", FacebookAuthBind, :bind
    post "/bind/firevale", FacebookAuthBind, :bind # bind facebook
    post "/bind/gfan", GFanAuthBind, :bind
    post "/bind/haima", HaimaAuthBind, :bind
    post "/bind/htc", HtcAuthBind, :bind
    post "/bind/huawei", HtcAuthBind, :bind
    post "/bind/i4", I4AuthBind, :bind
    post "/bind/iiapple", IIAppleAuthBind, :bind
    post "/bind/itools", ItoolsAuthBind, :bind
    post "/bind/iyouxi", IYouxiAuthBind, :bind
    post "/bind/ky", KYAuthBind, :bind
    post "/bind/lenovo", LenovoAuthBind, :bind
    post "/bind/meizu", MeizuAuthBind, :bind
    post "/bind/mumayi", MumayiAuthBind, :bind
    post "/bind/ndcom", NdcomAuthBind, :bind
    post "/bind/oppo", OppoAuthBind, :bind
    post "/bind/pp", PPAuthBind, :bind
    post "/bind/qh360", Qh360AuthBind, :bind
    post "/bind/qxz", QxzAuthBind, :bind
    post "/bind/sogou", SogouAuthBind, :bind
    post "/bind/tbt", TBTAuthBind, :bind
    post "/bind/uc", UCAuthBind, :bind
    post "/bind/vivo", VivoAuthBind, :bind
    post "/bind/wdj", WandoujiaAuthBind, :bind
    post "/bind/xiaomi", XiaomiAuthBind, :bind
    post "/bind/xy", XYAuthBind, :bind
    post "/bind/youku", YoukuAuthBind, :bind
    post "/bind/yyh", YYHAuthBind, :bind

    get  "/authorization_token", PageController, :show_login_page
    post "/gen_token", UserController, :create_token
    get  "/create_token", UserController, :create_token
    get  "/update_token", UserController, :update_token
    post "/update_token", UserController, :update_token
    get  "/bind_token", UserController, :bind_token
    get  "/anonymous_token", UserController, :create_anonymous_token
    get  "/verify_token", UserController, :verify_token
    post "/verify_token", UserController, :verify_token
    post "/get_token_user", UserController, :get_token_user
  end
end


defmodule Acs.UserApiRouter do
  use Acs.Web, :router

  # "/api/user forward from main router"
  scope "/", Acs do
    pipe_through :auth

    # 兼容旧fvsdk
    get  "/check_user_exists", UserController, :is_account_exists
    get  "/bind_anonymous/:bind_user_id", UserController, :bind_anonymous
    get  "/send_forgot_password_token", VerifyCodeController, :send_retrieve_password_verify_code
    get  "/check_forgot_password_token", VerifyCodeController, :check_retrieve_password_verify_code
    get  "/reset_password", UserController, :update_password
    get  "/email_regist", UserController, :email_regist
  end

end