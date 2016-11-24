defmodule Acs.SdkPay.PurchaseCallbackController do
  use    Acs.Web, :controller

  alias Acs.SdkPay.AnzhiCallbackController
  alias Acs.SdkPay.BaiduCallbackController
  alias Acs.SdkPay.CCPlayCallbackController
  alias Acs.SdkPay.CCPlayCallbackController
  alias Acs.SdkPay.CoolPadCallbackController
  alias Acs.SdkPay.DownjoyCallbackController
  alias Acs.SdkPay.GFanCallbackController
  alias Acs.SdkPay.HaimaCallbackController
  alias Acs.SdkPay.HtcCallbackController
  alias Acs.SdkPay.HuaweiCallbackController
  alias Acs.SdkPay.I4CallbackController
  alias Acs.SdkPay.IIAppleCallbackController
  alias Acs.SdkPay.KYCallbackController
  alias Acs.SdkPay.LenovoCallbackController
  alias Acs.SdkPay.MeizuCallbackController
  alias Acs.SdkPay.MumayiCallbackController
  alias Acs.SdkPay.NdcomCallbackController
  alias Acs.SdkPay.OppoCallbackController
  alias Acs.SdkPay.PPCallbackController
  alias Acs.SdkPay.QxzCallbackController
  alias Acs.SdkPay.SogouCallbackController
  alias Acs.SdkPay.UCCallbackController
  alias Acs.SdkPay.VivoCallbackController
  alias Acs.SdkPay.WandoujiaCallbackController
  alias Acs.SdkPay.XiaomiCallbackController
  alias Acs.SdkPay.XYCallbackController
  alias Acs.SdkPay.YoukuCallbackController
  alias Acs.SdkPay.YYHCallbackController

  plug :fetch_app_id
  plug :fetch_app

  def dispatch_callback(conn, %{"sdk" => "anzhi"} = params), do: AnzhiCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "baidu"} = params), do: BaiduCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "cc"} = params), do: CCPlayCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "ccplay"} = params), do: CCPlayCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "coolpad"} = params), do: CoolPadCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "downjoy"} = params), do: DownjoyCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "gfan"} = params), do: GFanCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "haima"} = params), do: HaimaCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "htc"} = params), do: HtcCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "huawei"} = params), do: HuaweiCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "i4"} = params), do: I4CallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "iiapple"} = params), do: IIAppleCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "ky"} = params), do: KYCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "lenovo"} = params), do: LenovoCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "meizu"} = params), do: MeizuCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "mumayi"} = params), do: MumayiCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "ndcom"} = params), do: NdcomCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "oppo"} = params), do: OppoCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "pp"} = params), do: PPCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "qxz"} = params), do: QxzCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "sogou"} = params), do: SogouCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "uc"} = params), do: UCCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "vivo"} = params), do: VivoCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "wdj"} = params), do: WandoujiaCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "xiaomi"} = params), do: XiaomiCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "xy"} = params), do: XYCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "youku"} = params), do: YoukuCallbackController.purchase_callback(conn, params) 
  def dispatch_callback(conn, %{"sdk" => "yyh"} = params), do: YYHCallbackController.purchase_callback(conn, params) 

  def dispatch_callback(conn, %{"sdk" => sdk}), do: conn |> send_resp(500, "sdk #{sdk} is not support")

end