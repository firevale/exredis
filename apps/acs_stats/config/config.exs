use Mix.Config

config :acs_stats, ecto_repos: [AcsStats.Repo]

config :acs_stats, AcsStats.Repo,
  adapter: Ecto.Adapters.MySQL,
  charset: "utf8mb4",
  pool_size: 10,
  pool_max_overflow: 10

import_config "#{Mix.env}.exs"
