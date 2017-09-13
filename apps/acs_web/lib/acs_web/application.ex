defmodule AcsWeb.Application do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    port = Application.get_env(:acs_web, :tcp_port, 9527)
    node = System.get_env("NODE")
    # Define workers and child supervisors to be supervised
    children = [
      # Start the endpoint when the application starts
      supervisor(AcsWeb.Endpoint, []),

      supervisor(Task.Supervisor, [[name: AcsWeb.TaskSupervisor]]),
      # Start your own worker by calling: AcsWeb.Worker.start_link(arg1, arg2, arg3)
      # worker(AcsWeb.Worker, [arg1, arg2, arg3]),
      worker(TcpServer, [port, [:binary, 
        packet: 2, 
        active: :false, 
        reuseaddr: true, 
        nodelay: true], AcsWeb.Tcp.TcpConn]),
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: AcsWeb.Supervisor]
  
    res = Supervisor.start_link(children, opts)
    AcsStats.remove_online_node(node)
    res
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    AcsWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
