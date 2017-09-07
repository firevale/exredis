use Mix.Config

import_config "prod_base.exs"

config :acs, AcsWeb.Endpoint,
  url: [host: "fvac.firevale.com", port: 443, scheme: "https"],
  static_url: [host: "acs01.firevale.com", port: 443, scheme: "https"]

config :exsm, :provider, :meisheng