use Mix.Config

import_config "prod.base.exs"

config :acs, Acs.Web.Endpoint,
  url: [host: "fvac.firevale.com", port: 443, scheme: "https"],
  static_url: [host: "fvaccdn.firevale.com", port: 443, scheme: "https"]

config :acs, sm_provider: :meisheng
config :acs, email_service_provider: Acs.SendCloudMailer

# Configure your database
config :acs, Acs.Repo,
  adapter: Ecto.Adapters.MySQL,
  username: "acs",
  password: "A2m#x@8#Y%jVPv7*",
  database: "acs",
  hostname: "10.10.235.154",
  pool_size: 10

config :acs, Acs.StatsRepo,
  adapter: Ecto.Adapters.MySQL,
  username: "acs",
  password: "A2m#x@8#Y%jVPv7*",
  database: "acs_stats",
  hostname: "10.10.235.154",
  pool_size: 10

config :acs, :elasticsearch,
  pool: [size: 10, max_overflow: 20],
  connection: [host: "10.10.56.136", port: 9200]

config :redis_poolex,
  # host: "10.10.56.136",
  host: "10.10.242.97",
  port: 6379,
  password: "",
  db: 0,
  reconnect: :no_reconnect,
  pool_size: 20,
  pool_max_overflow: 10
