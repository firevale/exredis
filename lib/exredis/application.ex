defmodule Exredis.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    config =
      Application.get_all_env(:exredis)
      |> Confex.Resolver.resolve!()

    unless config[:url] do
      raise "redis url is not configured!"
    end

    redis_url_opts =
      Keyword.get(config, :url)
      |> Redix.URI.opts_from_uri()

    pool_args = Keyword.get(config, :pool, [])

    pool_args =
      [size: 10, max_overflow: 20]
      |> Keyword.merge(pool_args)

    pool_args = pool_args ++ [name: {:local, :exredis}, worker_module: Redix]

    redix_opts =
      config
      |> Keyword.delete(:pool)
      |> Keyword.delete(:redlock)
      |> Keyword.delete(:url)
      |> Keyword.merge(redis_url_opts)
      |> Keyword.put(:socket_opts, [keepalive: true])
      |> Keyword.put(:sync_connect, true)

    lock_opts =
      Keyword.get(config, :redlock, [])
      |> Keyword.merge(servers: [redis_url_opts])

    children = [
      {Redlock, lock_opts},
      :poolboy.child_spec(:exredis, pool_args, redix_opts)
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: Exredis.Supervisor)
  end
end
