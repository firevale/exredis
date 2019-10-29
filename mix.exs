defmodule Exredis.Mixfile do
  use Mix.Project

  def project do
    [
      app: :exredis,
      version: "0.10.1",
      elixir: "~> 1.8",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger, :redix],
      mod: {Exredis.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:redix, "~> 0.10"},
      {:poolboy, "~> 1.5"},
      {:fastglobal, "~> 1.0.0"},
      {:ex_hash_ring, "~> 3.0"},
      {:secure_random, "~> 0.5.1"}
    ]
  end
end
