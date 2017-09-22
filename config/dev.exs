use Mix.Config

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# config sm service provider to none
# get verify code from console info log
config :exsm, :provider, :none

config :exservice, KSFile,
  domain: "ks3-cn-beijing.ksyun.com",
  bucket: "platform-dev",
  cdn_domain: "platform-dev.ks3-cn-beijing.ksyun.com",
  cdn_scheme: "http"

config :exsdks, :alipay,
  notify_url: "http://#{System.get_env("ACS_HOST") || "xiaobin.firevale.com"}/api/pay/alipay/notify",
  callback_url: "http://#{System.get_env("ACS_HOST") || "xiaobin.firevale.com"}/payment/pay_proxy?merchant_order_id={order_id}",
  merchant_url: "http://#{System.get_env("ACS_HOST") || "xiaobin.firevale.com"}/payment/pay_proxy?merchant_order_id={order_id}"