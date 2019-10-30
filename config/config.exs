# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

config :exredis,
  url: {:system, :string, "REDIS_URL", "redis://localhost:6379/15"},
  pool: [
    size: {:system, :integer, "REDIS_POOL_SIZE", 10},
    max_overflow: {:system, :integer, "REDIS_POOL_OVERFLOW", 20}
  ],
  redlock: [
    pool_size: 2,
    drift_factor: 0.01,
    max_retry: 100,
    retry_interval_base: 300,
    retry_interval_max: 3_000,
    reconnection_interval_base: 500,
    reconnection_interval_max: 5_000
  ]

# This configuration is loaded before any dependency and is restricted
# to this project. If another project depends on this project, this
# file won't be loaded nor affect the parent project. For this reason,
# if you want to provide default values for your application for
# 3rd-party users, it should be done in your "mix.exs" file.

# You can configure your application as:
#
#     config :exredis, key: :value
#
# and access this configuration in your application as:
#
#     Application.get_env(:exredis, :key)
#
# You can also configure a 3rd-party app:
#
#     config :logger, level: :info
#

# It is also possible to import configuration files, relative to this
# directory. For example, you can emulate configuration per environment
# by uncommenting the line below and defining dev.exs, test.exs and such.
# Configuration from the imported file will override the ones defined
# here (which is why it is important to import them last).
#
#     import_config "#{Mix.env}.exs"
