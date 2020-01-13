defmodule Exredis.Mixfile do
  use Mix.Project

  def project do
    [
      app: :exredis,
      version: "0.10.14",
      elixir: "~> 1.8",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger, :confex, :redix, :redlock],
      mod: {Exredis.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:redix, "~> 0.10"},
      {:poolboy, "~> 1.5"},
      {:confex, "~> 3.4"}
    ]
  end
end
