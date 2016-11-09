# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :acs,
  ecto_repos: [Acs.Repo]

# Configures the endpoint
config :acs, Acs.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "NVAlSDVOMDNSRkU5VllOKDdQOTFTKCZGNzFOVlNDTEQpX1EoTUc0N0VVUkpRKzdCJFhYUlE5QjFOU0dKTUJHRzhCK0tWMTdNIyUjVzBVQ0VO",
  render_errors: [view: Acs.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Acs.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Config UCloud UFile Management
config :acs, :ufile,
  public_key: "ucloudxiaobin@firevale.com1368084534286667901",
	private_key: "ccabbef071d26ee247aa1c642eef7b7692accce9",
  bucket: "fvvr",
  cdn_scheme: "https",
  cdn_domain: "fvvrres.firevale.com"

config :acs, :pbkdf2,
  mac_func: :sha,
  salt: "gGshJCGHNVVltq9n+Bji6w==",
  iterations: 4096,
  derived_length: 2

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
