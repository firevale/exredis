defmodule Exredis.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    pool_size = Application.get_env(:exredis, :pool_size, 5)

    redix_workers = for i <- 0..(cfg[:pool] - 1) do
      worker(Redix, [Exredis.Helper.conn_cfg(), [name: :"redix_#{i}"]], id: {Redix, i})
    end

    Supervisor.start_link(redix_workers, strategy: :one_for_one, name: Exredis.Supervisor)
  end
end
