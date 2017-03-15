defmodule Acs do
  use Application

  require Ecto.Migrator
  require Elasticsearch

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

      # start elasticsearch pool
      :poolboy.child_spec(:elasticsearch, pool_args, es_cfg[:connection]),
    ]

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
   unless Elasticsearch.is_index?("acs") do
      settings = %{
        number_of_shards: 5,
        number_of_replicas: 1,
      }

      orders_mapping = %{
        properties: %{
          app_id: %{type: :keyword},
          user_id: %{type: :keyword},
          goods_id: %{type: :keyword},
          device_id: %{type: :keyword},
          cp_order_id: %{type: :text},
          transaction_id: %{type: :text},
          app_user_id: %{type: :keyword},
          sdk_user_id: %{type: :keyword},
          created_at: %{type: :date},
        }
      }

      Elasticsearch.create_index("acs", settings, %{
        orders: orders_mapping
      })
    end

    unless Elasticsearch.is_index?("forum") do
         settings = %{
           number_of_shards: 5,
           number_of_replicas: 1,
         }

         posts_mapping = %{
           properties: %{
             id: %{type: :integer},
             forum_id: %{type: :integer},
             user_id: %{type: :integer},
             section_id: %{type: :integer},
             title: %{type: :text, analyzer: :smartcn},
             content: %{type: :text, analyzer: :smartcn},
             is_top: %{type: :boolean},
             is_hot: %{type: :boolean},
             is_vote: %{type: :boolean},
             reads: %{type: :integer},
             comms: %{type: :integer},
             created_at: %{type: :date},
             last_reply_at: %{type: :date},
             active: %{type: :boolean},
             has_pic: %{type: :boolean}
           }
         }

         Elasticsearch.create_index("forum", settings, %{
           posts: posts_mapping
         })
    end
  end

end
