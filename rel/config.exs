use Mix.Releases.Config,
  default_release: :acs,
  default_environment: Mix.env

environment :dev do
  set dev_mode: true 
  set include_erts: false
  set include_system_libs: false
  set cookie: :dev
end

environment :ucbj do
  set include_erts: true
  set include_system_libs: true
  set cookie: :acs
end

environment :uchk do
  set include_erts: true
  set include_system_libs: true
  set cookie: :acs
end

release :acs do
  set version: current_version(:acs)
  set applications: [        
    :elixir_make,
    :ex_syslogger,
    :inets,
    :poolboy,
    :ssl,
    :public_key,
    :timex,
    :des_ecb3,
    :phoenix,
    :phoenix_pubsub,
    :phoenix_pubsub_redis,
    :mogrify,
    :phoenix_html,
    :cowboy,
    :logger,
    :logger_file_backend,
    :gettext,
    :phoenix_ecto,
    :mariaex,
    :redix,
    :redix_pubsub,
    :exredis,
    :redis_poolex,
    :oauth2,
    :oauther,
    :comeonin,
    :httpotion,
    :pbkdf2,
    :xmerl,
    :sweet_xml,
    :gen_smtp,
    :bamboo,
    :bamboo_smtp,
    :bugsnag,
    :plugsnag,
    :floki,
    :exmoji,
    :mix,
    :cachex,
  ]

  set vm_args: "rel/vm.args"
end