defmodule AcsWeb.Mixfile do
  use Mix.Project

  def project do
    [
      app: :acs_web,
      version: "0.0.1",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.4",
      elixirc_paths: elixirc_paths(Mix.env),
      compilers: [:phoenix, :gettext] ++ Mix.compilers,
      start_permanent: Mix.env == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {AcsWeb.Application, []},
      extra_applications: [:logger, :bugsnag, :exmail, :runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_),     do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.3.0"},
      {:phoenix_pubsub, "~> 1.0"},
      {:phoenix_ecto, "~> 3.2"},
      {:phoenix_html, "~> 2.10"},
      {:phoenix_live_reload, "~> 1.0", only: :dev},
      {:gettext, "~> 0.11"},
      {:cowboy, "~> 1.0"},
      {:cors_plug, "~> 1.4"},
      {:mogrify, "~> 0.5"},
      {:des_ecb3, github: "xbinxu/des_ecb3"},
      {:plugsnag, "~> 1.3.0"},

      {:acs, in_umbrella: true},
      {:acs_stats, in_umbrella: true},
      {:exsm, in_umbrella: true},
      {:exredis, in_umbrella: true},
      {:excache, in_umbrella: true},
      {:exsdks, in_umbrella: true},
      {:exservice, in_umbrella: true},
      {:extcp, in_umbrella: true},
      {:exwcp, in_umbrella: true},
      {:exmail, in_umbrella: true},
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, we extend the test task to create and migrate the database.
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    ["test": ["ecto.create --quiet", "ecto.migrate", "test"]]
  end
end
