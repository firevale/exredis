defmodule Acs.AppSdkInfoController do
  use Acs.Web, :controller

  def generate_dummy_sdk_info(conn, %{"sdk" => "facebook"}) do 
    conn |> json(%{success: true, binding: %{app_id: "", app_secret: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "ggplay"}) do 
    conn |> json(%{success: true, binding: %{key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "ndcom"}) do 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "itools"}) do 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: "", rsa_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "cc"}) do # 虫虫
    conn |> json(%{success: true, binding: %{app_id: "", app_key: "", pay_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "tbt"}) do # 同步推 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "pp"}) do # PP 越狱渠道 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: "", pay_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "xy"}) do # XY 越狱渠道 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: "", pay_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "ky"}) do # KY 越狱渠道 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: "", md5_key: "", rsa_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "yyh"}) do # 应用汇
    conn |> json(%{success: true, binding: %{app_id: "", app_key: "", pay_id: "", pay_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "i4"}) do # i4 越狱渠道 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: "", pay_id: "", pay_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "haima"}) do # 海马越狱渠道 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "iiapple"}) do # iiapple 越狱渠道
    conn |> json(%{success: true, binding: %{app_id: "", app_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "baidu"}) do # 百度
    conn |> json(%{success: true, binding: %{app_id: "", app_key: "", app_secret: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "oppo"}) do # OPPO 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: "", app_secret: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "downjoy"}) do # 当乐 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: "", app_secret: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "uc"}) do # UC 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "youku"}) do # 优酷 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: "", app_secret: "", pay_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "anzhi"}) do # 安智 
    conn |> json(%{success: true, binding: %{app_key: "", app_secret: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "gfan"}) do # 机锋市场 
    conn |> json(%{success: true, binding: %{app_uid: "", app_key: "", app_secret: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "huawei"}) do # 华为 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: "", pay_id: "", pay_pub_key: "", pay_priv_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "htc"}) do # HTC聚乐 
    conn |> json(%{success: true, binding: %{game_code: "", pub_key: "", priv_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "iyouxi"}) do # 电信爱游戏 
    conn |> json(%{success: true, binding: %{client_id: "", client_secret: "", app_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "coolpad"}) do # 电信爱游戏 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: "", pay_pub_key: "", pay_priv_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "xiaomi"}) do # 小米 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: "", app_secret: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "qxz"}) do # 七匣子 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "wdj"}) do # 豌豆荚 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: "", rsa_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "mumayi"}) do # 木蚂蚁 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "lenovo"}) do # 联想 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "meizu"}) do # 魅族 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: "", app_secret: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "vivo"}) do # VIVO 
    conn |> json(%{success: true, binding: %{app_id: "", cp_id: "", cp_key: ""}})
  end
  def generate_dummy_sdk_info(conn, %{"sdk" => "sogou"}) do # 搜狗 
    conn |> json(%{success: true, binding: %{app_id: "", app_key: "", app_secret: "", pay_key: ""}})
  end

  def update_app_sdk_info(conn, params) do 

  end

end