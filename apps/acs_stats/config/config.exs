use Mix.Config

config :acs_stats, ecto_repos: [Acs.StatsRepo]

import_config "#{Mix.env}.exs"
