defmodule Exredis.Mixfile do
  use Mix.Project

  def project do
    [
      app: :exredis,
      version: "0.10.11",
      elixir: "~> 1.8",
      start_permanent: Mix.env() not in [:dev, :test],
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
      {:redlock, git: gitpub("redlock"), tag: "v1.0.11"},
      {:confex, "~> 3.4"}
    ]
  end

  defp gitpub(repo), do: "https://gitpub.firevale.com/platform/#{repo}.git"
end
