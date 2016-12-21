
defmodule Acs.AuthApiRouter do
  use Acs.Web, :router

  import  Acs.Plugs

  pipeline :auth do 
    plug :fetch_app_id
    plug :fetch_app
  end

  # "/api/auth forward from main router"
  scope "/", Acs do
    pipe_through :auth

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

    post "/gen_token", UserController, :create_token
    get  "/create_token", UserController, :create_token
    get  "/update_token", UserController, :update_token
    get  "/bind_token", UserController, :bind_token
    post "/update_token", UserController, :update_token
    get  "/anonymous_token", UserController, :create_anonymous_token
  end
end


defmodule Acs.UserApiRouter do
  use Acs.Web, :router

  import  Acs.Plugs

  pipeline :auth do 
    plug :fetch_app_id
    plug :fetch_app
  end

  # "/api/user forward from main router"
  scope "/", Acs do
    pipe_through :auth

    # 兼容旧fvsdk
    get  "/check_user_exists", UserController, :is_account_exists
    get  "/bind_anonymous/:bind_user_id", UserController, :bind_anonymous
    get  "/send_forgot_password_token", VerifyCodeController, :send_retrieve_password_verify_code
    get  "/check_forgot_password_token", VerifyCodeController, :check_retrieve_password_verify_code
    get  "/reset_password", UserController, :update_password
  end

end