defmodule Acs.Umbrella.Mixfile do
  use Mix.Project

  def project do
    [
      apps_path: "apps",
      start_permanent: Mix.env == :prod,
      deps: deps(),
      aliases: aliases(),
    ]
  end

  # Dependencies can be Hex packages:
  #
  #   {:mydep, "~> 0.3.0"}
  #
  # Or git/path repositories:
  #
  #   {:mydep, git: "https://github.com/elixir-lang/mydep.git", tag: "0.1.0"}
  #
  # Type "mix help deps" for more examples and options.
  #
  # Dependencies listed here are available only for this project
  # and cannot be accessed from applications inside the apps folder
  defp deps do
    [
      {:ex_syslogger, "~> 1.3"},
      {:phoenix_pubsub_redis, "~> 2.1"},
      {:redix, "~> 0.6", override: true},
      {:redix_pubsub, "~> 0.4", override: true},
      {:distillery, "~> 1.5", runtime: false},
    ]
  end

  defp aliases do
    ["ecto.setup": ["ecto.create", 
                    "ecto.migrate", 
                    "run priv/repo/seeds.exs"],
     "ecto.reset": ["ecto.drop", "ecto.setup"],
     "test.reset": [
                    "ecto.drop --quiet", 
                    "ecto.create --quiet", 
                    "ecto.migrate --quiet", 
                    "run priv/repo/test_seeds.exs"],
    ]
  end
end
