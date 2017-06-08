defmodule Acs.SdkInfoGenerator do 

  def generate_sdk_info("facebook") do 
    %{app_id: "", app_secret: ""}
  end
  def generate_sdk_info("ggplay") do 
    %{key: ""}
  end
  def generate_sdk_info("ndcom") do 
    %{app_id: "", app_key: ""}
  end
  def generate_sdk_info("itools") do 
    %{app_id: "", app_key: "", rsa_key: ""}
  end
  def generate_sdk_info("cc") do # 虫虫
    %{app_id: "", app_key: "", pay_key: ""}
  end
  def generate_sdk_info("tbt") do # 同步推 
    %{app_id: "", app_key: ""}
  end
  def generate_sdk_info("pp") do # PP 越狱渠道 
    %{app_id: "", app_key: "", pay_key: ""}
  end
  def generate_sdk_info("xy") do # XY 越狱渠道 
    %{app_id: "", app_key: "", pay_key: ""}
  end
  def generate_sdk_info("ky") do # KY 越狱渠道 
    %{app_id: "", app_key: "", md5_key: "", rsa_key: ""}
  end
  def generate_sdk_info("yyh") do # 应用汇
    %{app_id: "", app_key: "", pay_id: "", pay_key: ""}
  end
  def generate_sdk_info("i4") do # i4 越狱渠道 
    %{app_id: "", app_key: "", pay_id: "", pay_key: ""}
  end
  def generate_sdk_info("haima") do # 海马越狱渠道 
    %{app_id: "", app_key: ""}
  end
  def generate_sdk_info("iiapple") do # iiapple 越狱渠道
    %{app_id: "", app_key: ""}
  end
  def generate_sdk_info("baidu") do # 百度
    %{app_id: "", app_key: "", app_secret: ""}
  end
  def generate_sdk_info("oppo") do # OPPO 
    %{app_id: "", app_key: "", app_secret: ""}
  end
  def generate_sdk_info("downjoy") do # 当乐 
    %{app_id: "", app_key: "", app_secret: ""}
  end
  def generate_sdk_info("qh360") do # 奇虎360 
    %{app_id: "", app_key: "", app_secret: ""}
  end
  def generate_sdk_info("uc") do # UC 
    %{app_id: "", app_key: ""}
  end
  def generate_sdk_info("youku") do # 优酷 
    %{app_id: "", app_key: "", app_secret: "", pay_key: ""}
  end
  def generate_sdk_info("anzhi") do # 安智 
    %{app_key: "", app_secret: ""}
  end
  def generate_sdk_info("gfan") do # 机锋市场 
    %{app_uid: "", app_key: "", app_secret: ""}
  end
  def generate_sdk_info("huawei") do # 华为 
    %{app_id: "", app_key: "", pay_id: "", pay_pub_key: "", pay_priv_key: ""}
  end
  def generate_sdk_info("htc") do # HTC聚乐 
    %{game_code: "", pub_key: "", priv_key: ""}
  end
  def generate_sdk_info("iyouxi") do # 电信爱游戏 
    %{client_id: "", client_secret: "", app_key: ""}
  end
  def generate_sdk_info("coolpad") do # 电信爱游戏 
    %{app_id: "", app_key: "", pay_pub_key: "", pay_priv_key: ""}
  end
  def generate_sdk_info("xiaomi") do # 小米 
    %{app_id: "", app_key: "", app_secret: ""}
  end
  def generate_sdk_info("qxz") do # 七匣子 
    %{app_id: "", app_key: ""}
  end
  def generate_sdk_info("wdj") do # 豌豆荚 
    %{app_id: "", app_key: "", rsa_key: ""}
  end
  def generate_sdk_info("mumayi") do # 木蚂蚁 
    %{app_id: "", app_key: ""}
  end
  def generate_sdk_info("lenovo") do # 联想 
    %{app_id: "", app_key: ""}
  end
  def generate_sdk_info("meizu") do # 魅族 
    %{app_id: "", app_key: "", app_secret: ""}
  end
  def generate_sdk_info("vivo") do # VIVO 
    %{app_id: "", cp_id: "", cp_key: ""}
  end
  def generate_sdk_info("sogou") do # 搜狗 
    %{app_id: "", app_key: "", app_secret: "", pay_key: ""}
  end
  def generate_sdk_info("wechat") do # 微信 
    %{partnerid: "", app_id: "", app_secret: "", signature: "", package_name: "", sign_key: ""}
  end

end