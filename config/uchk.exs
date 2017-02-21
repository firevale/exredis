use Mix.Config

import_config "prod.base.exs"

config :acs, Acs.Endpoint,
  url: [host: "hkac.firevale.com", port: 443, scheme: "https"],
  static_url: [host: "d3kus54sky882h.cloudfront.net", port: 443, scheme: "https"]

# Don't support mobile phone at Hong Kong site
config :acs, sm_provider: :none
config :acs, email_service_provider: Acs.MandrillMailer

# Configure your database
config :acs, Acs.Repo,
  adapter: Ecto.Adapters.MySQL,
  username: "acs",
  password: "A2m#x@8#Y%jVPv7*",
  database: "acs",
  hostname: "10.10.235.15",
  pool_size: 10

config :acs, :elasticsearch, 
  pool: [size: 10, max_overflow: 20],
  connection: [host: {:system, "ACS_ELASTICSEARCH_HOSTNAME"}, port: {:system, "ACS_ELASTICSEARCH_PORT"}]

config :redis_poolex,
  host: "10.10.241.252",
  port: 6380,
  password: "",
  db: 0,
  reconnect: :no_reconnect,
  pool_size: 20,
  pool_max_overflow: 10