defmodule TcpServer do
  use     GenServer
  require Logger

  def start_link(port, opts, module) do
    GenServer.start_link(__MODULE__, [port, opts, module], name: __MODULE__)
  end

  def init([port, opts, module]) do
    Logger.info("Accepting stats Tcp connections on port #{port}, tcp connection module: #{inspect module}")

    with {:ok, socket} <- :gen_tcp.listen(port, opts),
         {:ok, acceptor} <- :prim_inet.async_accept(socket, -1)
    do
      {:ok, %{socket: socket, acceptor: acceptor, conn_counter: 0, module: module}}
    else 
      _ ->
        {:stop, "Stats tcp server listen on port #{port} failed"}
    end
  end

  def handle_cast(:conn_closed, %{conn_counter: counter} = state) do 
    {:noreply, %{state | conn_counter: counter - 1}}
  end

  def handle_info({:inet_async, listen_socket, _acceptor, {:ok, client_socket}}, %{conn_counter: counter} = state) do 
    try do 
      with :ok <- set_sockopt(listen_socket, client_socket),
           :ok <- start_conn(client_socket, state.module),
           {:ok, new_acceptor} <- :prim_inet.async_accept(listen_socket, -1)
      do 
        {:noreply, %{state | acceptor: new_acceptor, conn_counter: counter + 1}}
      else 
        e ->
          {:stop, e}
      end
    catch
      :exit, why -> 
        Logger.error("error in assync accept: #{inspect why}")
        {:stop, why}
    end
  end

  def terminate(_reason, %{socket: _socket}) do
    Logger.error("tcp server stopped")
    :ok
  end

  defp set_sockopt(listen_socket, client_socket) do 
    with true <- :inet_db.register_socket(client_socket, :inet_tcp),
         {:ok, opts} <- :prim_inet.getopts(listen_socket, [:active, :nodelay, :keepalive, :delay_send, :priority, :tos]),
         :ok <- :prim_inet.setopts(client_socket, opts) 
    do 
      :ok
    else 
      what ->
        :gen_tcp.close(client_socket)
        Logger.error("error set client socket opts: #{inspect what}")
        :error
    end
  end

  defp start_conn(client_socket, module) do 
    with {:ok, pid} <- Supervisor.start_child(TcpConn.Supervisor, []),
         :ok <- :gen_tcp.controlling_process(client_socket, pid)
    do 
      apply(module, :set_socket, [pid, client_socket])
    else
      what ->
        Logger.error("error start client conn process, module: #{inspect module}, reason: #{inspect what}")
        :error
    end
  end
end
