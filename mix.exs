defmodule Acs.Mixfile do
  use Mix.Project

  def project do
    [app: :acs,
     version: "0.0.1",
     elixir: "~> 1.3",
     elixirc_paths: elixirc_paths(Mix.env),
     compilers: [:phoenix, :gettext] ++ Mix.compilers,
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     aliases: aliases(),
     deps: deps()]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [mod: {Acs, []},
     included_applications: [
       :exsyslog,
     ],
     applications: [ 
        :inets, 
        :poolboy, 
        :ssl, 
        :public_key, 
        :timex,
        :des_ecb3,
        :phoenix, 
        :phoenix_pubsub,
        # :phoenix_pubsub_redis,
        :mogrify,
        :phoenix_html,
        :cowboy,
        :logger, 
        :logger_file_backend,
        :gettext,
        :phoenix_ecto,
        :mariaex,
        :exredis,
        :redis_poolex,
        :oauth2,
        :oauther,
        :comeonin, 
        :httpotion,
        :pbkdf2,
        :sweet_xml,
        :gen_smtp,
        :bugsnag,
        :bamboo,
        :bamboo_smtp,
        :plugsnag,
        :mix,
    ]]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "web", "test/support"]
  defp elixirc_paths(_),     do: ["lib", "web"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [{:phoenix, "~> 1.2.1"},
     {:phoenix_pubsub, "~> 1.0"},
     {:phoenix_ecto, "~> 3.0"},
     {:mariaex, ">= 0.0.0"},
     {:phoenix_html, "~> 2.6"},
     {:phoenix_live_reload, "~> 1.0", only: :dev},
     {:ecto, "~> 2.1", override: true},
     {:gettext, "~> 0.11"},
     {:cowboy, "~> 1.0"},
     {:httpotion, "~> 3.0"},
     {:redis_poolex, ">= 0.0.6"},
     {:poolboy, "~> 1.5"},
     {:logger_file_backend, ">= 0.0.9"},
     {:pbkdf2, "~> 2.0"}, # should modify rebar.config
     {:comeonin, "~> 2.6"},
     {:des_ecb3, github: "xbinxu/des_ecb3"},
     {:plugsnag, "~> 1.2"},
     {:mogrify, "~> 0.5"},
     {:exsyslog, "~> 1.0"},
     {:poison, "~> 3.0", override: true},
     {:sweet_xml, "~> 0.6"},
     {:oauth2, "~> 0.6", hex: :oauth2_erlang},
     {:oauther, "~> 1.1"},
     {:timex, "~> 3.1", override: true},
     {:bamboo, "~> 0.8"},
     {:bamboo_smtp, "~> 1.3"},
     {:exrm, "~> 1.0"},
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    ["ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
     "ecto.reset": ["ecto.drop", "ecto.setup"],
     "test": ["ecto.create --quiet", "ecto.migrate", "test"]]
  end
end
