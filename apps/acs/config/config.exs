use Mix.Config

config :acs, ecto_repos: [Acs.Repo]

# use env "ACS_DATABASE_URL" for db connection
config :acs, Acs.Repo,
  adapter: Ecto.Adapters.MySQL,
  charset: "utf8mb4",
  pool_size: 10,
  pool_max_overflow: 10

import_config "#{Mix.env}.exs"

