defmodule Acs.SdkPayRouter do
  use Acs.Web, :router

  post "/default_callback", Acs.FVSdkController, :default_callback

  scope "/", Acs.SdkPay do
    pipe_through :sdkpay

    get  "/add_channel_order", AppOrderController, :add_order
    post "/add_channel_order", AppOrderController, :add_order
    get  "/add_meizu_order",   AppOrderController, :add_meizu_order
    post "/add_meizu_order",   AppOrderController, :add_meizu_order
    get  "/add_vivo_order",    AppOrderController, :add_vivo_order
    post "/add_vivo_order",    AppOrderController, :add_vivo_order

    get  "/anzhi/:client_id", AnzhiCallbackController, :purchase_callback
    post "/anzhi/:client_id", AnzhiCallbackController, :purchase_callback

    get  "/baidu/:client_id", BaiduCallbackController, :purchase_callback
    post "/baidu/:client_id", BaiduCallbackController, :purchase_callback

    get  "/cc/:client_id", CCPlayCallbackController, :purchase_callback
    post "/cc/:client_id", CCPlayCallbackController, :purchase_callback

    get  "/coolpad/:client_id", CoolpadCallbackController, :purchase_callback
    post "/coolpad/:client_id", CoolpadCallbackController, :purchase_callback

    get  "/downjoy/:client_id", DownjoyCallbackController, :purchase_callback
    post "/downjoy/:client_id", DownjoyCallbackController, :purchase_callback

    get  "/gfan/:client_id", GfanCallbackController, :purchase_callback
    post "/gfan/:client_id", GfanCallbackController, :purchase_callback

    get  "/haima/:client_id", HaimaCallbackController, :purchase_callback
    post "/haima/:client_id", HaimaCallbackController, :purchase_callback

    get  "/htc/:client_id", HtcCallbackController, :purchase_callback
    post "/htc/:client_id", HtcCallbackController, :purchase_callback

    get  "/huawei/:client_id", HuaweiCallbackController, :purchase_callback
    post "/huawei/:client_id", HuaweiCallbackController, :purchase_callback

    get  "/i4/:client_id", I4CallbackController, :purchase_callback
    post "/i4/:client_id", I4CallbackController, :purchase_callback

    get  "/iiapple/:client_id", IIAppleCallbackController, :purchase_callback
    post "/iiapple/:client_id", IIAppleCallbackController, :purchase_callback

    get  "/itools/:client_id", ItoolsCallbackController, :purchase_callback
    post "/itools/:client_id", ItoolsCallbackController, :purchase_callback

    post "/iyouxi/:client_id/if1", IYouxiCallbackController, :if2_callback
    post "/iyouxi/:client_id/if2", IYouxiCallbackController, :if2_callback

    post "/ky/:client_id", KYCallbackController, :purchase_callback

    get  "/lenovo/:client_id", LenovoCallbackController, :purchase_callback
    post "/lenovo/:client_id", LenovoCallbackController, :purchase_callback

    get  "/meizu/:client_id", MeizuCallbackController, :purchase_callback
    post "/meizu/:client_id", MeizuCallbackController, :purchase_callback

    get  "/mumayi/:client_id", MumayiCallbackController, :purchase_callback
    post "/mumayi/:client_id", MumayiCallbackController, :purchase_callback

    get  "/ndcom/:client_id", NdcomCallbackController, :purchase_callback
    post "/ndcom/:client_id", NdcomCallbackController, :purchase_callback

    get  "/oppo/:client_id", OppoCallbackController, :purchase_callback
    post "/oppo/:client_id", OppoCallbackController, :purchase_callback

    get  "/pp/:client_id", PPCallbackController, :purchase_callback
    post "/pp/:client_id", PPCallbackController, :purchase_callback

    get  "/qh360/:client_id", Qh360CallbackController, :purchase_callback
    post "/qh360/:client_id", Qh360CallbackController, :purchase_callback

    get  "/qxz/:client_id", QxzCallbackController, :purchase_callback
    post "/qxz/:client_id", QxzCallbackController, :purchase_callback

    get  "/sogou/:client_id", SogouCallbackController, :purchase_callback
    post "/sogou/:client_id", SogouCallbackController, :purchase_callback

    get  "/tbt/:client_id", TbtCallbackController, :purchase_callback
    post "/tbt/:client_id", TbtCallbackController, :purchase_callback

    get  "/uc/:client_id", UCCallbackController, :purchase_callback
    post "/uc/:client_id", UCCallbackController, :purchase_callback

    get  "/vivo/:client_id", VivoCallbackController, :purchase_callback
    post "/vivo/:client_id", VivoCallbackController, :purchase_callback

    get  "/wdj/:client_id", WandoujiaCallbackController, :purchase_callback
    post "/wdj/:client_id", WandoujiaCallbackController, :purchase_callback

    get  "/xiaomi/:client_id", XiaomiCallbackController, :purchase_callback
    post "/xiaomi/:client_id", XiaomiCallbackController, :purchase_callback

    get  "/xy/:client_id", XYCallbackController, :purchase_callback
    post "/xy/:client_id", XYCallbackController, :purchase_callback

    get  "/youku/:client_id", YoukuCallbackController, :purchase_callback
    post "/youku/:client_id", YoukuCallbackController, :purchase_callback

    get  "/yyh/:client_id", YYHCallbackController, :purchase_callback
    post "/yyh/:client_id", YYHCallbackController, :purchase_callback

  end

end
