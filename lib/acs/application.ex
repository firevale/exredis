defmodule Acs.Application do
  use Application

  require Ecto.Migrator
  require Elasticsearch
  require Cachex

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec

    :ok = Application.ensure_started(:idna)
    :ok = Application.ensure_started(:hackney)
    :ok = Application.ensure_started(:tzdata)
    :ok = Application.ensure_started(:redis_poolex)

    es_cfg = Application.get_env(:acs, :elasticsearch)
    pool_args = es_cfg[:pool] ++ [name: {:local, :elasticsearch}, worker_module: Elasticsearch.Worker]

    :ok = Elasticsearch.ensure_can_start

    # Define workers and child supervisors to be supervised
    children = [
      # Start the Ecto repository
      supervisor(Acs.Repo, []),
      supervisor(Acs.StatsRepo, []),
      # Start the endpoint when the application starts
      supervisor(Acs.Web.Endpoint, []),

      # Start your own worker by calling: Acs.Worker.start_link(arg1, arg2, arg3)
      # worker(Acs.Worker, [arg1, arg2, arg3]),
      worker(Acs.RedisSubscriber, []),

      supervisor(Task.Supervisor, [[name: Acs.TaskSupervisor]]),

      worker(Cachex, [:default, [
        default_ttl: :timer.seconds(60), 
        limit: %Cachex.Limit{limit: 100_000, policy: Cachex.Policy.LRW, reclaim: 0.5},
        record_stats: true,
        ttl_interval: :timer.seconds(3600),
        hooks: [%Cachex.Hook{
          module: Acs.CachexHook,
          server_args: [name: Acs.CachexHook]
          }],
        ]]),

      # start elasticsearch pool
      :poolboy.child_spec(:elasticsearch, pool_args, es_cfg[:connection]),
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Acs.Supervisor]
    res = Supervisor.start_link(children, opts)
    # run migration when app startup
    Ecto.Migrator.run Acs.Repo, Path.join(["#{:code.priv_dir(:acs)}", "repo", "migrations"]), :up, all: true
    Ecto.Migrator.run Acs.StatsRepo, Path.join(["#{:code.priv_dir(:acs)}", "stats_repo", "migrations"]), :up, all: true
    # this line will fail if elasticsearch is not correctly configured
    init_elasticsearch_mappings()
    # return res
    res
  end

  defp init_elasticsearch_mappings() do
    Acs.AppOrder.init_mapping()
    Acs.Forum.init_mapping()
    Acs.Question.init_mapping()
    Acs.MallOrder.init_mapping()
    Acs.MallGoods.init_mapping()
  end

end
