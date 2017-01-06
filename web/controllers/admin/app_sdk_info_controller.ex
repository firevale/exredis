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

  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "facebook", 
                                  "binding" => %{"app_id" => _, "app_secret" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "facebook", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "ggplay", 
                                  "binding" => %{"key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "ggplay", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "ndcom", 
                                  "binding" => %{"app_id" => _, "app_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "ndcom", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "itools", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "rsa_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "itools", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "cc", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "pay_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "cc", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "tbt", 
                                  "binding" => %{"app_id" => _, "app_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "tbt", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "pp", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "pay_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "pp", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "xy", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "pay_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "xy", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "ky", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "md5_key" => _, "rsa_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "ky", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "yyh", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "pay_id" => _, "pay_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "yyh", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "i4", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "rsa_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "i4", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "haima", 
                                  "binding" => %{"app_id" => _, "app_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "haima", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "iiapple", 
                                  "binding" => %{"app_id" => _, "app_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "iiapple", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "baidu", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "app_secret" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "baidu", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "oppo", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "app_secret" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "oppo", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "downjoy", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "app_secret" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "downjoy", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "qh360", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "app_secret" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "qh360", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "uc", 
                                  "binding" => %{"app_id" => _, "app_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "uc", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "youku", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "app_secret" => _, "pay_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "youku", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "anzhi", 
                                  "binding" => %{"app_key" => _, "app_secret" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "anzhi", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "gfan", 
                                  "binding" => %{"app_uid" => _, "app_key" => _, "app_secret" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "gfan", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "huawei", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "pay_id" => _, "pay_pub_key" => _, "pay_priv_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "huawei", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "htc", 
                                  "binding" => %{"game_code" => _, "pub_key" => _, "priv_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "htc", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "iyouxi", 
                                  "binding" => %{"client_id" => _, "client_secret" => _, "app_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "iyouxi", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "coolpad", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "pay_pub_key" => _, "pay_priv_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "coolpad", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "xiaomi", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "app_secret" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "xiaomi", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "wdj", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "rsa_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "wdj", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "mumayi", 
                                  "binding" => %{"app_id" => _, "app_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "mumayi", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "lenovo", 
                                  "binding" => %{"app_id" => _, "app_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "lenovo", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "meizu", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "app_secret" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "meizu", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "vivo", 
                                  "binding" => %{"app_id" => _, "cp_id" => _, "cp_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "vivo", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "sogou", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "app_secret" => _, "pay_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "sogou", binding)
  end
  def update_app_sdk_info(conn, _params) do 
    conn |> send_resp(500, "bad request") |> halt 
  end

  defp _update_app_sdk_info(conn, app_id, sdk, binding) do 
    binding = case Repo.get_by(AppSdkBinding, app_id: app_id, sdk: sdk) do 
      nil ->
        AppSdkBinding.changeset(%AppSdkBinding{}, %{app_id: app_id, sdk: sdk, binding: binding}) |> Repo.insert!
      sdk_binding ->
        AppSdkBinding.changeset(sdk_binding, %{binding: binding}) |> Repo.update!
    end

    RedisApp.refresh(app_id)
    conn |> json(%{success: true, binding: binding})
  end

end