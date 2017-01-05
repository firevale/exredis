# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :acs, ecto_repos: [Acs.Repo]
  
config :acs, static_page_root: "/"

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

config :acs, :platforms, ~w(android ios wp8 windows macos)

# 是否使用火谷自己的充值渠道
config :acs, :custom_iap,
  ios: false,
  wp8: [:alipay],
  android: [:alipay]

config :acs, :sdks, ~w(alipay appstore applestore ggplay anzhi baidu cc coolpad downjoy facebook firevale gfan haima 
                       htc huawei i4 iiapple itools iyouxi ky lenovo meizu mumayi ndcom oppo pp qh360 qq qxz sogou tbt uc 
                       vivo wdj wechat xiaomi xy youku yyh)

config :acs, :pbkdf2,
  mac_func: :sha,
  salt: "gGshJCGHNVVltq9n+Bji6w==",
  iterations: 4096,
  derived_length: 20

config :acs, Acs.LocalMailer,
  adapter: Bamboo.LocalAdapter

config :acs, :email_service,
  provider: Acs.LocalMailer

config :acs, :facebook, graph_url: "https://graph.facebook.com/v2.1"


# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

import_config "services.exs"
