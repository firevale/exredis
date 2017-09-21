use Mix.Config

config :acs, ecto_repos: [Acs.Repo]

config :acs, :sdks, ~w(alipay appstore applestore ggplay anzhi baidu cc coolpad downjoy facebook firevale gfan haima 
                       htc huawei i4 iiapple itools iyouxi ky lenovo meizu mumayi ndcom oppo pp qh360 qq qxz sogou tbt uc 
                       vivo wdj wechat xiaomi xy youku yyh)

config :acs, :platforms, ~w(ios android wp8 windows macos)

config :acs, :custom_iap,
  ios: false,
  wp8: [:alipay],
  android: [:alipay]

# use env "ACS_DATABASE_URL" for db connection
config :acs, Acs.Repo,
  adapter: Ecto.Adapters.MySQL,
  charset: "utf8mb4",
  pool_size: 10,
  pool_max_overflow: 10

import_config "#{Mix.env}.exs"

