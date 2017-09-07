defmodule Exutils.Mixfile do
  use Mix.Project

  def project do
    [
      app: :exutils,
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
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:pbkdf2, "~> 2.0"}, # should modify rebar.config
      {:comeonin, "~> 3.1"},
      {:poison, "~> 3.1"},
      {:httpotion, "~> 3.0"},
    ]
  end
end
