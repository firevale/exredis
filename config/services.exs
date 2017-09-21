use Mix.Config

config :exsm, Exsm.MeishengService,
  server_ip: "112.74.76.186",
  server_port: 8030,
  username: "JSM41501",
  password: "4xnvdx0d",
  secret: "kbmrtjhw6njk",
  template_verify: "JSM41501-0001"

config :exsdks, :alipay,
  certs_root: "/certs",
  notify_url: "https://fvac.firevale.com/api/pay/alipay/notify",
  callback_url: "https://fvac.firevale.com/payment/pay_proxy?merchant_order_id={order_id}",
  merchant_url: "https://fvac.firevale.com/payment/pay_proxy?merchant_order_id={order_id}"

config :exsdks, :wechat,
  prepay_url: "https://api.mch.weixin.qq.com/pay/unifiedorder",
  check_url: "https://api.mch.weixin.qq.com/pay/orderquery",
  close_url: "https://api.mch.weixin.qq.com/pay/closeorder",
  refund_url: "https://api.mch.weixin.qq.com/secapi/pay/refund",
  refundquery_url: "https://api.mch.weixin.qq.com/pay/refundquery",
  auth_base_url: "https://api.weixin.qq.com/sns"

config :exservice, NeteaseDun,
  secretId: "f94740b35af60351d389117156eef9aa",
  secretKey: "09b5a40215c5bc3b4c8159d8901d7f46",
  txt_businessId: "3fcaa4a970b5444ed676ffbffc545588",
  img_businessId: "afcb2720bea5912effcbda7a85a904b8",
  user_businessId: "65497b57a490592212b91c1d3305b757",
  check_txt_url: "https://api.aq.163.com/v3/text/check",
  check_img_url: "https://api.aq.163.com/v3/image/check"

config :exservice, Tinypng, "vFezemVJCvE6VYpWy6sFqB2Puja57XGm"

config :exservice, UFile,
  public_key: "ucloudxiaobin@firevale.com1368084534286667901",
  private_key: "ccabbef071d26ee247aa1c642eef7b7692accce9",
  bucket: "fvvr",
  cdn_scheme: "https",
  cdn_domain: "fvvrres.firevale.com"

config :exservice, Chaoxin,
  api_key: "239277:1d9ee0a4c5e5e54cad94f165c13734b1",
  default_group_id: 127697


config :exmail, Exmail.MandrillMailer,
  adapter: Bamboo.MandrillAdapter,
  api_key: "lT0K0Wk-ZELrCy2CC5BPDg",
  from: "noreply@fvac.firevale.com",
  reply: "noreply@fvac.firevale.com"

config :exmail, Exmail.SmtpMailer,
  adapter: Bamboo.SMTPAdapter,
  server: "smtp.exmail.qq.com",
  port: 465,
  username: "admin@firevale.com",
  password: "P76M4tDn4kuo",
  tls: :never, # can be `:always` or `:never`
  ssl: true, # can be `true`
  retries: 3

config :exmail, Exmail.SendCloudMailer,
  user: "fvac_cn",
  key: "iXkBkVUk3OEfF5MY",
  from: "noreply@sdmail.firevale.com",
  reply: "noreply@sdmail.firevale.com"

config :bugsnag, :notify_release_stages, ["ksbj"]








