defmodule Excache.Mixfile do
  use Mix.Project

  def project do
    [
      app: :excache,
      version: "0.1.0",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.4",
      start_permanent: Mix.env == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
      mod: {Excache.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:exredis, in_umbrella: true},
      {:exutils, in_umbrella: true},
      {:redix_pubsub_fastlane, "~> 0.3", repo: hex_repo()},
      {:cachex, "~> 2.1", repo: hex_repo()},
      {:poison, "~> 3.1", repo: hex_repo()},
    ]
  end

  defp hex_repo do 
    case System.get_env("HEX_REPO") do 
      "upyun" -> :upyun
      _ -> :hexpm
    end
  end
end
