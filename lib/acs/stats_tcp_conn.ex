defmodule Acs.StatsTcpConn do
  use GenServer
  use LogAlias

  def set_socket(pid, socket) do
    GenServer.call(pid, {:set_socket, socket})
  end


  @doc """
  Starts the registry.
  """
  def start_link() do
    GenServer.start(__MODULE__, [])
  end

  def init(_) do
    {:ok, %{socket: nil}}
  end

  def handle_call({:set_socket, socket}, _from, state) do 
    :ok = :inet.setopts(socket, [:binary, packet: 2, active: :once])
    {:reply, :ok, %{state | socket: socket}}
  end

  def handle_info({:tcp, _socket, "ping"}, %{socket: socket} = state) do
    :gen_tcp.send(<<4::integer-size(16), "pong">>)
    :inet.setopts(socket, active: :once)
    {:noreply, state}
  end
  def handle_info({:tcp, _socket, bin}, %{socket: socket} = state) do
    d "received package: #{inspect bin}"
    :inet.setopts(socket, active: :once)
    {:noreply, state}
  end
  def handle_info({:tcp_closed, _socket}, state) do
    {:stop, :normal, state}
  end
  def handle_info(info, state) do
    Logger.info "stats tcp connection receive info: #{inspect info}"
    {:noreply, state}
  end

  def terminate(reason, %{socket: socket}) do
    :gen_tcp.close(socket)
    :ok
  end

end
