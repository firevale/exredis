defmodule Exredis.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    pool_size = Application.get_env(:exredis, :pool_size, 5)

    redix_workers = for i <- 0..(pool_size - 1) do
      worker(Redix, [Keyword.merge(Exredis.Helper.conn_cfg(), name: :"redix_#{i}", sync_connect: true, exit_on_disconnection: true)], id: {Redix, i})
    end

    Supervisor.start_link(redix_workers, strategy: :rest_for_one, name: Exredis.Supervisor)
  end
end
