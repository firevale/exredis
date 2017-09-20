use Mix.Config

import_config "prod_base.exs"

config :acs_web, AcsWeb.Endpoint,
  url: [host: "fvac.firevale.com", port: 443, scheme: "https"],
  static_url: [host: "acs01.firevale.com", port: 443, scheme: "https", path: "/acs"]

config :exsm, :provider, :meisheng

config :exservice, KSFile,
  domain: "ks3-cn-beijing-internal.ksyun.com",
  bucket: "platform",
  cdn_domain: "pfcdn.firevale.com",
  cdn_scheme: "https"