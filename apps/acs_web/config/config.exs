# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :acs_web,
  namespace: AcsWeb,
  ecto_repos: [Acs.Repo, AcsStats.Repo, Exsm.Repo]

# Configures the endpoint
config :acs_web, AcsWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "lI04gf1Esn95ShYAFkCAh/d6zFKi9MW69IxeZas1KxJmhYzHkO98iFb7U1Cyezb1",
  render_errors: [view: AcsWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: AcsWeb.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :acs_web, :generators,
  context_app: :acs

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
