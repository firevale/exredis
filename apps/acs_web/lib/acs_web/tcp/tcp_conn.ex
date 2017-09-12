defmodule AcsWeb.Tcp.TcpConn do
  use GenServer
  use Utils.LogAlias

  require Exredis
  require Utils
  require AcsStats

  def set_socket(pid, socket) do
    GenServer.call(pid, {:set_socket, socket})
  end

  def send_msg(app_id, user_id, %{} = msg) do 
    case Process.whereis(:"u#{app_id}#{user_id}") do 
      nil ->
        {:error, :not_exist}
      pid ->
        GenServer.call(pid, {:send_message, Poison.encode!(msg)})
    end
  end
  def send_msg!(app_id, user_id, %{} = msg) do 
    GenServer.call(:"u#{app_id}#{user_id}", {:send_message, Poison.encode!(msg)})
  end

  @doc """
  Starts the registry.
  """
  def start_link() do
    GenServer.start_link(__MODULE__, [])
  end
  def start() do
    GenServer.start(__MODULE__, [])
  end

  def init(_) do
    d "stats tcp connection process start...."
    {:ok, timer} = :timer.send_after(10000, :heartbeart)
    node = System.get_env("NODE") || "acs"
    {:ok, %{socket: nil, node: node, timer: timer, active: false}}
  end

  def handle_call({:set_socket, socket}, _from, state) do 
    d "stats tcp connection established....#{inspect socket}"
    :ok = :inet.setopts(socket, [:binary, packet: :line, active: :once])
    {:reply, :ok, %{state | socket: socket}}
  end
  def handle_call({:send_message, msg}, _from, %{socket: socket} = state) do 
    result = :gen_tcp.send(socket, "#{msg}\r\n")
    {:reply, result, %{state | socket: socket}}
  end

  def handle_cast(:kill, _from, %{user_id: user_id} = state) do
    Process.unregister(:"u#{user_id}")
    {:stop, :normal, state}
  end

  def handle_info({:tcp, _socket, "ping\r\n"}, %{socket: socket, timer: timer} = state) do
    :timer.cancel(timer)
    :gen_tcp.send(socket, "pong\r\n")
    :inet.setopts(socket, active: :once)
    {:ok, timer} = :timer.send_after(10000, :heartbeart)
    # d "receive ping, return pong"
    {:noreply, %{state | timer: timer}}
  end
  def handle_info({:tcp, _socket, payload}, %{socket: socket} = state) do
    :inet.setopts(socket, active: :once)
    case handle_message(Poison.decode!(payload, keys: :atoms), state) do 
      {:ok, new_state} ->  
        :ok = :gen_tcp.send(socket, "ok\r\n")
        {:noreply, new_state}
      _ ->
        error "receive invalid message: #{inspect payload}"
        :ok = :gen_tcp.send(socket, "error\r\n")
        {:stop, :error, state}
    end
  end
  def handle_info({:tcp_closed, _socket}, state) do
    {:stop, :normal, state}
  end
  def handle_info(:heartbeart, %{socket: _socket} = state) do
    {:stop, :normal, state}
  end
  def handle_info(info, state) do
    info "stats tcp connection receive info: #{inspect info}"
    {:noreply, state}
  end

  def terminate(reason, %{socket: socket, 
    timer: _timer,
    active: true,
    node: node,
    app_id: app_id,
    user_id: user_id,
    platform: platform} = state) do
    info "stats tcp connection terminate with reason: #{reason}, #{inspect state}"
    AcsStats.remove_online_user(node, app_id, platform, user_id)
    log_stats_activities(state)
    :gen_tcp.close(socket)
    :ok
  end
  def terminate(reason, %{socket: socket, 
    timer: _timer,
    active: false,
    node: node,
    app_id: app_id,
    user_id: user_id,
    platform: platform} = state) do
    info "inactive stats tcp connection terminate with reason: #{reason}, #{inspect state}"
    AcsStats.remove_online_user(node, app_id, platform, user_id)
    :gen_tcp.close(socket)
    :ok
  end
  def terminate(reason, %{socket: socket, timer: _timer} = state) do
    info "stats tcp connection terminate with reason: #{inspect reason}, #{inspect state}"
    :gen_tcp.close(socket)
    :ok
  end
  def terminate(_reason, %{timer: _timer}) do
    :ok
  end

  defp handle_message(%{
    type: "join",
    payload: %{
      access_token: access_token_id,
      user_id: user_id,
      app_id: app_id,
      device_id: device_id, 
      device_model: device_model,
      platform: platform,
      os_ver: os_ver,
      sdk: sdk
    } = payload
  }, %{node: _node} = state) do 
    user_id = String.to_integer("#{user_id}")
    pname = String.to_atom("u#{app_id}#{user_id}") 
    case Process.whereis(pname) do 
      nil -> :ok 
      _pid -> Process.unregister(pname)
    end
    Process.register(self(), pname)

    case Auth.get_access_token(access_token_id) do
      %{device_id: ^device_id, user_id: ^user_id} -> 
        now = Timex.local()
        today = Timex.to_date(now)
        AcsStats.log_app_login_user(today, app_id, user_id, platform)
        info "#{today} user login, user_id: #{user_id}, device_id: #{device_id}"
        new_state = state 
          |> Map.put(:access_token, access_token_id)
          |> Map.put(:user_id, user_id)
          |> Map.put(:app_id, app_id)
          |> Map.put(:device_id, device_id)
          |> Map.put(:device_model, device_model)
          |> Map.put(:platform, platform)
          |> Map.put(:os_ver, os_ver)
          |> Map.put(:sdk, sdk)
          |> Map.put(:today, today)
        {:ok, new_state}

      token -> 
        error "receive invalid join request, token: #{inspect token}, payload: #{inspect payload}"
        :error
    end
  end

  defp handle_message(%{type: "updateGameData", payload: %{app_user_id: ""} = payload}, %{node: _node} = state) do 
    info "receive invalid updateGameData message: #{inspect payload}, #{inspect state}"
    :error
  end
  defp handle_message(%{
    type: "updateGameData",
    payload: %{
      app_user_id: app_user_id,
      app_user_name: app_user_name,
      app_user_level: app_user_level,
      zone_id: zone_id, 
    }
  }, %{app_id: app_id, platform: platform, sdk: sdk, user_id: user_id, device_id: device_id, node: node} = state) do 
    now = Timex.local()
    today = Timex.to_date(now)

    AcsStats.add_online_user(node, app_id, platform, user_id)
    AcsStats.log_app_user(today, app_id, zone_id, user_id, platform, sdk, app_user_id, app_user_name, app_user_level)
    AcsStats.log_app_device(today, app_id, platform, sdk)

    info "#{today} user enter game, user_id: #{user_id}, device_id: #{device_id}"
    new_state = state 
      |> Map.put(:app_user_id, app_user_id)
      |> Map.put(:app_user_name, app_user_name)
      |> Map.put(:app_user_level, app_user_level)
      |> Map.put(:zone_id, zone_id)
      |> Map.put(:today, today)
      |> Map.put(:join_at, Timex.to_unix(now))
      |> Map.put(:active, true)
    {:ok, new_state}
  end

  defp handle_message(%{
    type: "reset",
    payload: %{
      user_id: user_id,
    }
  }, %{node: node, app_id: app_id, platform: platform} = state) do 
    Logger.metadata(user_id: user_id)

    today = Timex.local |> Timex.to_date
    AcsStats.log_app_login_user(today, app_id, user_id, platform)

    if user_id != state.user_id do 
      AcsStats.remove_online_user(node, app_id, platform, state.user_id)
    end

    if state.active do 
      log_stats_activities(state)    
    end

    new_state = state
      |> Map.put(:user_id, user_id)
      |> Map.put(:today, today)
      |> Map.put(:active, false)
      |> Map.delete(:app_user_id)
      |> Map.delete(:app_user_name)
      |> Map.delete(:app_user_level)
      |> Map.delete(:zone_id)
      |> Map.delete(:join_at)
    {:ok, new_state} 
end
  defp handle_message(%{
    type: "reset",
    payload: %{
      user_id: user_id,
    }
  }, state) do 
    today = Timex.local |> Timex.to_date
    new_state = state
      |> Map.put(:user_id, user_id)
      |> Map.put(:today, today)
      |> Map.delete(:app_user_id)
      |> Map.delete(:app_user_name)
      |> Map.delete(:app_user_level)
      |> Map.delete(:zone_id)
      |> Map.delete(:join_at)
    {:ok, new_state} 
  end

  defp handle_message(%{type: "pause"}, %{
    active: true, 
    node: node, 
    app_id: app_id, 
    platform: platform, 
    user_id: user_id} = state) do 

    AcsStats.remove_online_user(node, app_id, platform, user_id)
    log_stats_activities(state)

    new_state = state 
      |> Map.put(:active, false)

    {:ok, new_state}
  end
  defp handle_message(%{type: "pause"}, %{
    active: false, 
    node: node, 
    app_id: app_id, 
    platform: platform, 
    user_id: user_id} = state) do 
    AcsStats.remove_online_user(node, app_id, platform, user_id)
    {:ok, state}
  end
  defp handle_message(%{type: "pause"}, state) do 
    {:ok, state}
  end

  defp handle_message(%{type: "resume"}, %{
    node: node, 
    app_id: app_id, 
    platform: platform, 
    app_user_id: _app_user_id, # entered game  
    user_id: user_id} = state) do 

    now = Timex.local()
    today = Timex.to_date(now)

    AcsStats.add_online_user(node, app_id, platform, user_id)

    new_state = state 
      |> Map.put(:today, today)
      |> Map.put(:join_at, Timex.to_unix(now))
      |> Map.put(:active, true)

    {:ok, new_state}
  end
  defp handle_message(%{type: "resume"}, state) do 
    {:ok, state |> Map.put(:today, Timex.local() |> Timex.to_date())}
  end

  defp log_stats_activities(%{
    active: true,
    app_id: app_id,
    platform: platform,
    sdk: sdk,
    zone_id: zone_id,
    user_id: user_id,
    device_id: device_id,
    today: today,
    join_at: join_at
    }) do

    active_seconds = max(Utils.unix_timestamp - join_at, 0)
    info "[STAT] #{today}, #{app_id}, #{zone_id}, #{platform}, #{sdk}, #{user_id}, #{device_id}, #{active_seconds}"

    if active_seconds > 30 do
      AcsStats.log_app_device_activity(today, app_id, device_id, active_seconds)
      AcsStats.log_app_user_activity(today, app_id, zone_id, user_id, active_seconds)
    end
  end
  defp log_stats_activities(_socket), do: :ok



end
