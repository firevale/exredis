use Mix.Config

import_config "prod_base.exs"

config :exsm, :provider, :meisheng

config :exservice, KSFile,
  domain: "ks3-cn-beijing.ksyun.com",
  bucket: "platform-dev",
  cdn_domain: "platform-dev.ks3-cn-beijing.ksyun.com",
  cdn_scheme: "http"