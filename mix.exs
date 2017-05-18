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
     mod: {Acs, []}, 
     extra_applications: [:inets, :ssl, :public_key, :logger, :ex_syslogger]
    ]
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
     {:credo, "~> 0.7", only: :dev, rutime: false},
     {:ecto, "~> 2.1", override: true},
     {:gettext, "~> 0.11"},
     {:cowboy, "~> 1.0"},
     {:httpotion, "~> 3.0"},
     {:redis_poolex, ">= 0.0.6"},
     {:poolboy, "~> 1.5"},
     {:logger_file_backend, ">= 0.0.9"},
     {:pbkdf2, "~> 2.0"}, # should modify rebar.config
     {:comeonin, "~> 3.0"},
     {:des_ecb3, github: "xbinxu/des_ecb3"},
     {:plugsnag, "~> 1.3"},
     {:mogrify, "~> 0.5"},
     {:ex_syslogger, "~> 1.3"},
     {:poison, "~> 3.1", override: true},
     {:sweet_xml, "~> 0.6"},
     {:oauth2, "~> 0.6", hex: :oauth2_erlang},
     {:oauther, "~> 1.1"},
     {:timex, "~> 3.1", override: true},
     {:bamboo, "~> 0.8"},
     {:bamboo_smtp, "~> 1.3"},
     {:floki, "~> 0.17"},
     {:exmoji, "~> 0.2"},
     {:distillery, "~> 1.3", runtime: false},
     {:cachex, "~> 2.1"},
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    ["ecto.setup": ["ecto.create -r Acs.Repo", "ecto.migrate -r Acs.Repo", "ecto.create -r Acs.StatsRepo", "ecto.migrate -r Acs.StatsRepo", "run priv/repo/seeds.exs"],
     "ecto.reset": ["ecto.drop -r Acs.Repo", "ecto.drop -r Acs.StatsRepo", "ecto.setup"],
     "test": ["ecto.create --quiet -r Acs.Repo", "ecto.migrate --quiet -r Acs.Repo", "ecto.create --quiet -r Acs.StatsRepo", "ecto.migrate --quiet -r Acs.StatsRepo", "test"]]
  end
end
