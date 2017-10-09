defmodule Excache.Mixfile do
  use Mix.Project

  def project do
    [
      app: :excache,
      version: "0.1.0",
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
      {:exredis, git: "https://gitpub.firevale.com/platform/exredis.git", brunch: :master},
      {:exutils, git: "https://gitpub.firevale.com/platform/exutils.git", brunch: :master},
      {:redix_pubsub_fastlane, "~> 0.3"},
      {:cachex, "~> 2.1"},
      {:poison, "~> 3.1"},
    ]
  end
end
