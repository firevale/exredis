defmodule Acs.Application do
  use Application
  use LogAlias

  require Ecto.Migrator
  require Elasticsearch
  require Cachex
  require Redis

  alias   Ecto.Adapters.SQL

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

      worker(TcpServer, [9527, [:binary, 
        packet: 2, 
        active: :false, 
        keepalive: true, 
        reuseaddr: true, 
        nodelay: true], Acs.StatsTcpConn]),

      supervisor(TcpConn.Supervisor, [Acs.StatsTcpConn]),

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
    check_user_id_counter()
    reset_online_counter()
    # return res
    res
  end

  def stop(state) do 
    info "application stop with state: #{inspect state, pretty: true}"
    reset_online_counter()
    :ok
  end

  defp init_elasticsearch_mappings() do
    Acs.AppOrder.init_mapping()
    Acs.Forum.init_mapping()
    Acs.Question.init_mapping()
    Acs.MallOrder.init_mapping()
    Acs.MallGoods.init_mapping()
  end

  defp check_user_id_counter() do 
    case SQL.query(Acs.Repo, "select max(id) from users") do 
      {:ok, %{rows: [[max_user_id]]}} when is_integer(max_user_id) ->
        case Redis.get("fvac.counter.uid") do 
          :undefined ->
            error "user counter is not defined in redis, set to #{max_user_id + 1}"
            Redis.set("fvac.counter.uid", max_user_id + 1)
          uid ->
            uid = String.to_integer(uid)
            if uid < max_user_id do 
              error "uid counter in redis is: #{uid}, which is smaller than max user id #{max_user_id}, set redis uid counter to #{max_user_id + 1}"
              Redis.set("fvac.counter.uid", max_user_id + 1)
            end
        end
      _ ->
        :ok
    end
  end

  defp reset_online_counter() do 
    info "resetting online counter...."
    
    node_name = System.get_env("ACS_NODE_NAME")
    case Redis.keys("online_counter.*.#{node_name}") do 
      counter_list when is_list(counter_list) ->
        Enum.each(counter_list, fn(redis_key) -> 
          info "deleting redis online counter: #{redis_key}"
          Redis.del(redis_key)
        end)
      _ ->
        :ok
    end

    case Redis.keys("ponline_counter.*.#{node_name}") do 
      counter_list when is_list(counter_list) ->
        Enum.each(counter_list, fn(redis_key) -> 
          info "deleting redis platform online counter: #{redis_key}"
          Redis.del(redis_key)
        end)
      _ ->
        :ok
    end

    case Redis.keys("zonline_counter.*.#{node_name}") do 
      counter_list when is_list(counter_list) ->
        Enum.each(counter_list, fn(redis_key) -> 
          info "deleting redis zone online counter: #{redis_key}"
          Redis.del(redis_key)
        end)
      _ ->
        :ok
    end

  end

end
