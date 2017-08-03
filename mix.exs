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
    [
     mod: {Acs.Application, []}, 
     extra_applications: [:inets, :ssl, :public_key, :logger, :ex_syslogger, :runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_),     do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [{:phoenix, "~> 1.3.0"},
     {:phoenix_pubsub, "~> 1.0"},
     {:phoenix_pubsub_redis, "~> 2.1"},
     {:phoenix_ecto, "~> 3.2"},
     {:mariaex, ">= 0.0.0"},
     {:phoenix_html, "~> 2.9"},
     {:phoenix_live_reload, "~> 1.0", only: :dev},
     {:credo, "~> 0.8", only: :dev, rutime: false},
     {:ecto, "~> 2.1", override: true},
     {:gettext, "~> 0.13"},
     {:cowboy, "~> 1.1"},
     {:httpotion, "~> 3.0"},
     {:httpoison, "~> 0.12"},
     {:redis_poolex, ">= 0.0.6"},
     {:poolboy, "~> 1.5"},
     {:logger_file_backend, ">= 0.0.10"},
     {:pbkdf2, "~> 2.0"}, # should modify rebar.config
     {:comeonin, "~> 3.1"},
     {:des_ecb3, github: "xbinxu/des_ecb3"},
     {:unicode_util_compat, github: "benoitc/unicode_util_compat", override: true},
     {:bugsnag, "~> 1.5"},
     {:plugsnag, "~> 1.3"},
     {:mogrify, "~> 0.5"},
     {:ex_syslogger, "~> 1.3"},
     {:poison, "~> 3.1", override: true},
     {:sweet_xml, "~> 0.6"},
     {:oauth2, "~> 0.6", hex: :oauth2_erlang},
     {:oauther, "~> 1.1"},
     {:timex, "~> 3.1", override: true},
     {:bamboo, "~> 1.0.0-rc", override: true},
     {:bamboo_smtp, "~> 1.4"},
     {:floki, "~> 0.17"},
     {:exmoji, "~> 0.2"},
     {:distillery, "~> 1.4", runtime: false},
     {:cachex, "~> 2.1"},
     {:cookie_jar, "~> 1.0"},
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    ["ecto.setup": ["ecto.create -r Acs.Repo", 
                    "ecto.migrate -r Acs.Repo", 
                    "ecto.create -r Acs.StatsRepo", 
                    "ecto.migrate -r Acs.StatsRepo", 
                    "run priv/repo/seeds.exs"],
     "ecto.reset": ["ecto.drop -r Acs.Repo", "ecto.drop -r Acs.StatsRepo", "ecto.setup"],
     "test.reset": [
                    "ecto.drop --quiet -r Acs.Repo", 
                    "ecto.create --quiet -r Acs.Repo", 
                    "ecto.migrate --quiet -r Acs.Repo", 
                    "ecto.drop --quiet -r Acs.StatsRepo", 
                    "ecto.create --quiet -r Acs.StatsRepo", 
                    "ecto.migrate --quiet -r Acs.StatsRepo", 
                    "run priv/repo/test_seeds.exs"],
    ]
  end
end
