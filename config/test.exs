use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :acs, Acs.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :info

config :acs, Acs.Repo,
  adapter: Ecto.Adapters.MySQL,
  username: System.get_env("ACS_MYSQL_USER") || "root",
  password: System.get_env("ACS_MYSQL_PASSWORD") || "firevale",
  database: "acs_test",
  ownership_timeout: 30_000,
  hostname: System.get_env("ACS_MYSQL_HOSTNAME") || "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

config :acs, Acs.StatsRepo,
  adapter: Ecto.Adapters.MySQL,
  username: System.get_env("ACS_MYSQL_USER") || "root",
  password: System.get_env("ACS_MYSQL_PASSWORD") || "firevale",
  ownership_timeout: 30_000,
  database: "acs_stats_test",
  hostname: System.get_env("ACS_MYSQL_HOSTNAME") || "localhost",
  pool: Ecto.Adapters.SQL.Sandbox


config :acs, :elasticsearch,
  pool: [size: 10, max_overflow: 20],
  connection: [host: System.get_env("ACS_ELASTICSEARCH_HOSTNAME") || "localhost", port: 9200]

config :redis_poolex,
  host: System.get_env("ACS_REDIS_HOSTNAME") || "localhost",
  port: 6379,
  password: "",
  db: 15,
  reconnect: :no_reconnect,
  pool_size: 100,
  pool_max_overflow: 100
