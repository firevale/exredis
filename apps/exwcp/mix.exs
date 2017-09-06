defmodule Exwcp.Mixfile do
  use Mix.Project

  def project do
    [
      app: :exwcp,
      version: "0.1.0",
      elixir: "~> 1.4",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      start_permanent: Mix.env == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:plug, "~> 1.4"},
      {:httpoison, "~> 0.13"},
      {:floki, "~> 0.18"},
      {:exredis, in_umbrella: true},
      {:exutils, in_umbrella: true},
      {:excache, in_umbrella: true},
      # {:dep_from_hexpm, "~> 0.3.0"},
      # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"},
    ]
  end
end
