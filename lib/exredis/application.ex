defmodule Exredis.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    pool_size = Application.get_env(:exredis, :pool_size, 5)
    opts = Exredis.Helper.conn_cfg()

    redlock_opts = [
      pool_size: 2,
      drift_factor: 0.01,
      max_retry: 10,
      retry_interval_base: 300,
      retry_interval_max: 3_000,
      reconnection_interval_base: 500,
      reconnection_interval_max: 5_000,
      servers: [opts]
    ]

    redix_workers =
      for i <- 0..(pool_size - 1) do
        worker(
          Redix,
          [
            Keyword.merge(opts, name: :"redix_#{i}")
          ],
          id: {Redix, i}
        )
      end

    children = [{Redlock, redlock_opts} | redix_workers]

    Supervisor.start_link(children, strategy: :one_for_one, name: Exredis.Supervisor)
  end
end
