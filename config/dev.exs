use Mix.Config


# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with brunch.io to recompile .js and .css sources.
config :acs, Acs.Endpoint,
  http: [port: 4000],
  url: [host: System.get_env("ACS_HOST") || "localhost", port: 80, scheme: "http"],
  static_url: [host: System.get_env("ACS_HOST") || "localhost", port: 80, scheme: "http"],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: [yarn: ["run", "watch", cd: Path.expand("../static", __DIR__)]]


# Watch static and templates for browser reloading.
config :acs, Acs.Endpoint,
  live_reload: [
    patterns: [
      ~r{priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$},
      ~r{priv/gettext/.*(po)$},
      ~r{web/views/.*(ex)$},
      ~r{web/templates/.*(eex)$}
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

config :acs, sm_provider: :meisheng

config :acs, allow_origin: "*"

# Configure your database
config :acs, Acs.Repo,
  adapter: Ecto.Adapters.MySQL,
  username: System.get_env("ACS_MYSQL_USER") || "root",
  password: System.get_env("ACS_MYSQL_PASSWORD") || "firevale",
  database: "acs_dev",
  hostname: System.get_env("ACS_MYSQL_HOSTNAME") || "localhost",
  pool_size: 10

config :acs, :elasticsearch,
  pool: [size: 10, max_overflow: 20],
  connection: [host: System.get_env("ACS_ELASTICSEARCH_HOSTNAME") || "localhost", port: 9200]

config :redis_poolex,
  host: System.get_env("ACS_REDIS_HOSTNAME") || "localhost",
  port: 6379,
  password: "",
  db: 0,
  reconnect: :no_reconnect,
  pool_size: 20,
  pool_max_overflow: 10
