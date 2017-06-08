use Mix.Config

config :acs, Acs.Web.Endpoint,
  http: [port: 4000, compress: true],
  ssl: false,
  debug_errors: false,
  code_reloader: false,
  check_origin: ["//*.firevale.com"],
  cache_static_lookup: true,
  cache_static_manifest: "priv/static/cache_manifest.json",
  server: true

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
  backends: [
    {ExSyslogger, :exsyslog_info},
  ]

config :acs, allow_origin: "//*.firevale.com"
