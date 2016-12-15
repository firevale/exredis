
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

    post "/anzhi", AnzhiAuthBind, :bind
    post "/baidu", BaiduAuthBind, :bind
    post "/cc", CCPlayAuthBind, :bind
    post "/coolpad", CoolpadAuthBind, :bind
    post "/downjoy", DownjoyAuthBind, :bind
    post "/facebook", FacebookAuthBind, :bind
    post "/firevale", FacebookAuthBind, :bind # bind facebook
    post "/gfan", GFanAuthBind, :bind
    post "/haima", HaimaAuthBind, :bind
    post "/htc", HtcAuthBind, :bind
    post "/huawei", HtcAuthBind, :bind
    post "/i4", I4AuthBind, :bind
    post "/iiapple", IIAppleAuthBind, :bind
    post "/itools", ItoolsAuthBind, :bind
    post "/iyouxi", IYouxiAuthBind, :bind
    post "/ky", KYAuthBind, :bind
    post "/lenovo", LenovoAuthBind, :bind
    post "/meizu", MeizuAuthBind, :bind
    post "/mumayi", MumayiAuthBind, :bind
    post "/ndcom", NdcomAuthBind, :bind
    post "/oppo", OppoAuthBind, :bind
    post "/pp", PPAuthBind, :bind
    post "/qh360", Qh360AuthBind, :bind
    post "/qxz", QxzAuthBind, :bind
    post "/sogou", SogouAuthBind, :bind
    post "/tbt", TBTAuthBind, :bind
    post "/uc", UCAuthBind, :bind
    post "/vivo", VivoAuthBind, :bind
    post "/wdj", WandoujiaAuthBind, :bind
    post "/xiaomi", XiaomiAuthBind, :bind
    post "/xy", XYAuthBind, :bind
    post "/youku", YoukuAuthBind, :bind
    post "/yyh", YYHAuthBind, :bind

    post "/gen_token", UserController, :create_token
    get  "/create_token", UserController, :create_token
    get  "/update_token", UserController, :update_token
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

  end

end