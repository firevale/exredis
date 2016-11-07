defmodule Acs do
  use Application

  require Ecto.Migrator

  # See http://elixir-lang.org/docs/stable/elixir/Application.html
  # for more information on OTP Applications
  def start(_type, _args) do
    import Supervisor.Spec

    :ok = Application.ensure_started(:idna)
    :ok = Application.ensure_started(:hackney)
    :ok = Application.ensure_started(:tzdata)
    :ok = Application.ensure_started(:redis_poolex)

    es_cfg = Application.get_env(:acs, :elasticsearch)
    pool_args = es_cfg[:pool] ++ [name: {:local, :elasticsearch}, worker_module: ElasticSearch.Worker]

    :ok = ElasticSearch.ensure_can_start

    # Define workers and child supervisors to be supervised
    children = [
      # Start the Ecto repository
      supervisor(Acs.Repo, []),
      # Start the endpoint when the application starts
      supervisor(Acs.Endpoint, []),
      # Start your own worker by calling: Acs.Worker.start_link(arg1, arg2, arg3)
      # worker(Acs.Worker, [arg1, arg2, arg3]),

      # start elasticsearch pool 
      :poolboy.child_spec(:elasticsearch, pool_args, es_cfg[:connection]),
    ]

    # See http://elixir-lang.org/docs/stable/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Acs.Supervisor]
    res = Supervisor.start_link(children, opts)
    # run migration when app startup
    Ecto.Migrator.run Acs.Repo, Path.join(["#{:code.priv_dir(:acs)}", "repo", "migrations"]), :up, all: true
    # return res
    res 
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    Acs.Endpoint.config_change(changed, removed)
    :ok
  end
end
