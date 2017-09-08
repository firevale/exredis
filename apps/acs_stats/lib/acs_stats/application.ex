defmodule AcsStats.Application do
  @moduledoc """
  The Acs Application Service.

  The acs system business domain lives in this application.

  Exposes API to clients such as the `AcsWeb` application
  for use in channels, controllers, and elsewhere.
  """
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    port = Application.get_env(:acs_stats, :tcp_port, 9527)

    res = Supervisor.start_link([
      supervisor(AcsStats.Repo, []),
      worker(TcpServer, [port, [:binary, 
        packet: 2, 
        active: :false, 
        reuseaddr: true, 
        nodelay: true], AcsStats.Tcp.StatsTcpConn]),
    ], strategy: :one_for_one, name: AcsStats.Supervisor)

    Ecto.Migrator.run(AcsStats.Repo, Path.join(["#{:code.priv_dir(:acs_stats)}", "repo", "migrations"]), :up, all: true)
    res
  end
end
