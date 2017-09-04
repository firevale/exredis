defmodule Excache.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    import Supervisor.Spec
    
    # List all child processes to be supervised
    pool_size = Application.get_env(:exredis, :pool_size, 5)
    cfg = Exredis.Helper.conn_cfg()

    children = [
      # Starts a worker by calling: Excache.Worker.start_link(arg)
      # {Excache.Worker, arg},
      supervisor(Redix.PubSub.Fastlane, [Excache.PubSub.Redis, cfg ++ [pool_size: pool_size]]),
      
      worker(Excache.FastLane, []),

      worker(Cachex, [:default, [
        default_ttl: :timer.seconds(60), 
        limit: %Cachex.Limit{limit: 100_000, policy: Cachex.Policy.LRW, reclaim: 0.5},
        record_stats: true,
        ttl_interval: :timer.seconds(3600),
        hooks: [%Cachex.Hook{
          module: Excache.Hook,
          server_args: [name: Excache.Hook]
          }],
        ]]),                                                          
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Excache.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
