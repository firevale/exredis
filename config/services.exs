use Mix.Config

config :bugsnag, api_key: "3be9d27395dbccdda866ff8c409b40db"

config :acs, :chaoxin_bot,
  api_key: "239277:1d9ee0a4c5e5e54cad94f165c13734b1",
  default_group_id: 127697

# Config UCloud UFile Management
config :acs, :ufile,
  public_key: "ucloudxiaobin@firevale.com1368084534286667901",
	private_key: "ccabbef071d26ee247aa1c642eef7b7692accce9",
  bucket: "fvvr",
  cdn_scheme: "https",
  cdn_domain: "fvvrres.firevale.com"

config :acs, Acs.MandrillMailer,
  adapter: Bamboo.MandrillAdapter,
  api_key: "lT0K0Wk-ZELrCy2CC5BPDg",
  from: "noreply@fvac.firevale.com",
  reply: "noreply@fvac.firevale.com"

config :acs, Acs.SmtpMailer,
  adapter: Bamboo.SMTPAdapter,
  server: "smtp.exmail.qq.com",
  port: 465,
  username: "admin@firevale.com",
  password: "P76M4tDn4kuo",
  tls: :never, # can be `:always` or `:never`
  ssl: true, # can be `true`
  retries: 3

config :acs, Acs.SendCloudMailer,
  user: "fvac_cn",
  key: "iXkBkVUk3OEfF5MY",
  from: "noreply@sdmail.firevale.com",
  reply: "noreply@sdmail.firevale.com"

config :acs, :alipay,
  certs_root: "priv/certs",
  notify_url: "https://fvac.firevale.com/api/pay/alipay/notify",
  callback_url: "https://fvac.firevale.com/payment/pay_proxy?merchant_order_id={order_id}",
  merchant_url: "https://fvac.firevale.com/payment/pay_proxy?merchant_order_id={order_id}"

config :acs, :wechat,
  prepay_url: "https://api.mch.weixin.qq.com/pay/unifiedorder",
  check_url: "https://api.mch.weixin.qq.com/pay/orderquery",
  close_url: "https://api.mch.weixin.qq.com/pay/closeorder",
  refund_url: "https://api.mch.weixin.qq.com/secapi/pay/refund",
  refundquery_url: "https://api.mch.weixin.qq.com/pay/refundquery"

config :acs, Acs.MeishengSmsSender,
  server_ip: "112.74.76.186",
  server_port: 8030,
  username: "JSM41501",
  password: "4xnvdx0d",
  secret: "kbmrtjhw6njk",
  template_verify: "JSM41501-0001"
