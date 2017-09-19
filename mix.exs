defmodule Exmail.Mixfile do
  use Mix.Project

  def project do
    [
      app: :exmail,
      version: "0.1.0",
      elixir: "~> 1.4",
      elixirc_paths: ["lib"],
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      compilers: [:phoenix, :gettext] ++ Mix.compilers,
      start_permanent: Mix.env == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger, :exutils]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:bamboo, "~> 1.0.0-rc", override: true},
      {:bamboo_smtp, "~> 1.4"},
      {:phoenix, "~> 1.3"},
      {:gettext, "~> 0.11"},
      {:phoenix_html, "~> 2.10"},

      {:exutils, in_umbrella: true},
      # {:dep_from_hexpm, "~> 0.3.0"},
      # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"},
    ]
  end
end
