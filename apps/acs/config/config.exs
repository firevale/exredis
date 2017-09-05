use Mix.Config

config :acs, ecto_repos: [Acs.Repo]

import_config "#{Mix.env}.exs"
