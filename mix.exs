defmodule Exredis.Mixfile do
  use Mix.Project

  def project do
    [
      app: :exredis,
      version: "0.10.2",
      elixir: "~> 1.6",
      start_permanent: Mix.env() not in [:dev, :test],
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger, :redix_cluster],
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:redix_cluster, git: "https://gitpub.firevale.com/platform/redix_cluster.git", tag: "v0.10.2"},
    ]
  end
end
