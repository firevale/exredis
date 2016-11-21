# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :acs,
  ecto_repos: [Acs.Repo]
  
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

# Config bugsnag exception reporter
config :bugsnag, api_key: "3be9d27395dbccdda866ff8c409b40db"

config :acs, :platforms, ~w(android ios wp8 windows macos)

config :acs, :sdks, ~w(alipay appstore ggplay anzhi baidu cc ccplay coolpad downjoy facebook firevale gfan haima htc huawei i4 
                       iiapple itools iyouxi ky lenovo meizu mumayi ndcom oppo pp qh360 qq qxz sogou tbt uc vivo wdj wechat  
                       xiaomi xy youku yyh)

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
  derived_length: 20

config :acs, :mailer_templates, "priv/mail_templates"

config :acs, :mandrill, 
  key: "lT0K0Wk-ZELrCy2CC5BPDg",
  from: "noreply@fvac.firevale.com",
  fromname: "Firevale Account Center"

config :acs, :sendcloud, 
  user: "fvac_cn",
  key: "iXkBkVUk3OEfF5MY",
  from: "noreply@sdmail.firevale.com",
  fromname: "Firevale Account Center"

# Configure mailer smtp 
config :mailer, :smtp_client,
  server: "smtp.exmail.qq.com",
  ssl: true,
  port: 465,
  username: "admin@firevale.com",
  password: "P76M4tDn4kuo",
  transport: :smtp

config :acs, :facebook, graph_url: "https://graph.facebook.com/v2.1"

config :acs, :alipay,
  certs_root: "priv/certs",
  notify_url: "https://fvac.firevale.com/api/alipay/notify",
  callback_url: "https://fvac.firevale.com/api/alipay/callback?platform=%{platform}",
  merchant_url: "https://fvac.firevale.com/mobile/native_bridge/%{platform}"

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
