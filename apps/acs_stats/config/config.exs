use Mix.Config

config :acs_stats, ecto_repos: [AcsStats.Repo]

import_config "#{Mix.env}.exs"
