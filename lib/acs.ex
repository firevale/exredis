defmodule Acs do
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
      # Start the endpoint when the application starts
      supervisor(Acs.Endpoint, []),

      # Start your own worker by calling: Acs.Worker.start_link(arg1, arg2, arg3)
      # worker(Acs.Worker, [arg1, arg2, arg3]),
      supervisor(Task.Supervisor, [[name: Acs.TaskSupervisor]]),

      worker(Cachex, [:mem_cache, [
        default_ttl: :timer.seconds(10), 
        limit: %Cachex.Limit{limit: 100_000, policy: Cachex.Policy.LRW, reclaim: 0.5},
        record_stats: true,
        ttl_interval: :timer.seconds(5)
        ]]),

      # start elasticsearch pool
      :poolboy.child_spec(:elasticsearch, pool_args, es_cfg[:connection]),
    ]

    IO.inspect(children)

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Acs.Supervisor]
    res = Supervisor.start_link(children, opts)
    # run migration when app startup
    Ecto.Migrator.run Acs.Repo, Path.join(["#{:code.priv_dir(:acs)}", "repo", "migrations"]), :up, all: true
    # this line will fail if elasticsearch is not correctly configured
    init_elasticsearch_mappings()
    # return res
    res
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    Acs.Endpoint.config_change(changed, removed)
    :ok
  end

  defp init_elasticsearch_mappings() do
    Acs.AppOrder.init_mapping()
    Acs.Forum.init_mapping()
    Acs.Question.init_mapping()
    Acs.MallOrder.init_mapping()
    Acs.MallGoods.init_mapping()
  end

end
