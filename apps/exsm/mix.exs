defmodule Exsm.Mixfile do
  use Mix.Project

  def project do
    [
      app: :exsm,
      version: "0.1.0",
      elixir: "~> 1.4",
      start_permanent: Mix.env == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      mod: {Exsm.Application, []},
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:mariaex, ">= 0.0.0"},
      {:ecto, "~> 2.1"},
      {:sweet_xml, "~> 0.6"},
      {:exutils, git: "https://gitpub.firevale.com/platform/exutils.git", brunch: :master},
      # {:dep_from_hexpm, "~> 0.3.0"},
      # {:dep_from_git, git: "https://github.com/elixir-lang/my_dep.git", tag: "0.1.0"},
    ]
  end

end
