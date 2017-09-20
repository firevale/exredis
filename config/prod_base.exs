use Mix.Config

config :acs_web, AcsWeb.Endpoint,
  http: [:inet6, port: 4000, compress: true],
  ssl: false,
  debug_errors: false,
  code_reloader: false,
  check_origin: ["//*.firevale.com"],
  cache_static_lookup: true,
  cache_static_manifest: "priv/static/cache_manifest.json",
  secret_key_base: "XDHtULB0Xe5LZKNgIG4Qs+gLJbpoJktXhVgcNzFneTjQ2jiNTWpdThBvmadmd7GX",
  pubsub: [adapter: Phoenix.PubSub.Redis, name: AcsWeb.PubSub]
  # redis pubsub config use exredis host/port, node name from env "NODE"
  # see AcsWeb.Endpoint.init() function

config :phoenix, :serve_endpoints, true

# Do not include metadata nor timestamps in development logs
config :logger, :exsyslog_info,
  level: :debug,
  format: "$metadata -- $level --: $message \n",
  metadata: [:module, :line, :function, :user_id, :device_id],
  ident: "acs",
  facility: :local3,
  option: [:pid, :cons]

config :logger,
  handle_otp_reports: true,
  handle_sasl_reports: true,
  backends: [
    {ExSyslogger, :exsyslog_info},
  ]


