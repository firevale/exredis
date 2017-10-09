defmodule Exes.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    # List all child processes to be supervised
    es_cfg = Application.get_env(:exes, :elasticsearch)
    pool_args = es_cfg[:pool] ++ [name: {:local, :elasticsearch}, worker_module: Elasticsearch.Worker]

    :ok = Elasticsearch.ensure_can_start()

    children = [
      # Starts a worker by calling: Exes.Worker.start_link(arg)
      # {Exes.Worker, arg},
      :poolboy.child_spec(:elasticsearch, pool_args, es_cfg[:connection]),
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Exes.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
