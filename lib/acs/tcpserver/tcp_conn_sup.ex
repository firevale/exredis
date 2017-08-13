defmodule TcpConn.Supervisor do 
  use Supervisor

  def start_link(module) do 
    Supervisor.start_link(__MODULE__, module, name: __MODULE__)
  end

  def init(module) do 
    children = [
      worker(module, [], restart: :temporary, id: :undefined)
    ]
    supervise(children, strategy: :simple_one_for_one)
  end
end