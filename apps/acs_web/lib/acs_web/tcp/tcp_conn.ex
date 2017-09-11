defmodule AcsWeb.Tcp.TcpConn do
  use GenServer
  use Utils.LogAlias

  require Exredis
  require Utils

  alias  Acs.Auth

  alias  AcsStats.Repo 
  alias  AcsStats.Devices.Device
  alias  AcsStats.Devices.AppDevice
  alias  AcsStats.Devices.AppDeviceDailyActivity

  alias  AcsStats.Users.AppUser
  alias  AcsStats.Users.AppUserDailyActivity

  alias  AcsStats.Cache.CachedAppUser
  alias  AcsStats.Cache.CachedDevice
  alias  AcsStats.Cache.CachedAppDevice
  alias  AcsStats.Cache.CachedAppUserDailyActivity
  alias  AcsStats.Cache.CachedAppDeviceDailyActivity

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
    node = System.get_env("ACS_NODE_NAME")
    {:ok, %{socket: nil, node: node, timer: timer}}
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
    Process.unregister(String.to_atom("u#{user_id}"))
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
    decr_online_counter(node, app_id, platform, user_id)
    do_stat(state)
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
    decr_online_counter(node, app_id, platform, user_id)
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
        Exredis.sadd(dlu_key(today, app_id), user_id)
        Exredis.sadd(dlu_key(today, app_id, platform), user_id)
        Exredis.sadd(dld_key(today, app_id, platform), device_id)
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
      zone_name: zone_name
    }
  }, %{app_id: app_id, platform: platform, user_id: user_id, device_id: device_id, node: node} = state) do 
    now = Timex.local()
    today = Timex.to_date(now)
    yesterday = now |> Timex.shift(days: -1) |> Timex.to_date 

    Exredis.sadd(dlu_key(today, app_id), user_id)
    Exredis.sadd(dau_key(today, app_id), user_id)
    Exredis.sadd(dlu_key(today, app_id, platform), user_id)
    Exredis.sadd(dau_key(today, app_id, platform), user_id)
    Exredis.sadd(dld_key(today, app_id, platform), device_id)
    Exredis.sadd(dad_key(today, app_id, platform), device_id)

    if Exredis.sismember(dau_key(yesterday, app_id), user_id) do 
      Exredis.sadd(da2nu_key(today, app_id), user_id)
      Exredis.sadd(da2nu_key(today, app_id, platform), user_id)
    end

    if Exredis.sismember(dad_key(yesterday, app_id, platform), device_id) do 
      Exredis.sadd(da2nd_key(today, app_id, platform), device_id)
    end

    incr_online_counter(node, app_id, platform, user_id)
    info "#{today} user enter game, user_id: #{user_id}, device_id: #{device_id}"
    new_state = state 
      |> Map.put(:app_user_id, app_user_id)
      |> Map.put(:app_user_name, app_user_name)
      |> Map.put(:app_user_level, app_user_level)
      |> Map.put(:zone_id, zone_id)
      |> Map.put(:zone_name, zone_name)
      |> Map.put(:today, today)
      |> Map.put(:join_at, Timex.to_unix(now))
      |> Map.put(:active, true)
    init_stat_data(new_state)
    {:ok, new_state}
  end

  defp handle_message(%{
    type: "reset",
    payload: %{
      user_id: user_id,
    }
  }, %{app_id: app_id, platform: platform, node: node, device_id: device_id, app_user_id: app_user_id} = state) do 
    Logger.metadata(user_id: user_id)
    now = Timex.local()
    today = Timex.to_date(now)
    yesterday = now |> Timex.shift(days: -1) |> Timex.to_date 

    if app_user_id != "" do 
      Exredis.sadd(dlu_key(today, app_id), user_id)
      Exredis.sadd(dau_key(today, app_id), user_id)
      Exredis.sadd(dlu_key(today, app_id, platform), user_id)
      Exredis.sadd(dau_key(today, app_id, platform), user_id)
      Exredis.sadd(dld_key(today, app_id, platform), device_id)
      Exredis.sadd(dad_key(today, app_id, platform), device_id)

      if Exredis.sismember(dau_key(yesterday, app_id), user_id) do 
        Exredis.sadd(da2nu_key(today, app_id), user_id)
        Exredis.sadd(da2nu_key(today, app_id, platform), user_id)
      end

      if Exredis.sismember(dad_key(yesterday, app_id, platform), device_id) do 
        Exredis.sadd(da2nd_key(today, app_id, platform), device_id)
      end

      info "#{today} user enter game, user_id: #{user_id}, device_id: #{device_id}"

      if user_id != state.user_id do 
        decr_online_counter(node, app_id, platform, state.user_id)
        incr_online_counter(node, app_id, platform, user_id)
      end

      if state.active do 
        do_stat(state)    
      end
      new_state = state
        |> Map.put(:user_id, user_id)
        |> Map.put(:today, today)
        |> Map.put(:join_at, Timex.to_unix(now))
      init_stat_data(new_state)
      {:ok, new_state}
    else
      new_state = state
        |> Map.put(:user_id, user_id)
        |> Map.put(:today, today)
        |> Map.put(:join_at, Timex.to_unix(now))
      {:ok, new_state} 
    end
  end
  defp handle_message(%{
    type: "reset",
    payload: %{
      user_id: user_id,
    }
  }, state) do 
    now = Timex.local
    today = now |> Timex.to_date
    new_state = state
      |> Map.put(:user_id, user_id)
      |> Map.put(:today, today)
      |> Map.put(:join_at, Timex.to_unix(now))
    {:ok, new_state} 
  end

  defp handle_message(%{type: "pause"}, %{
    active: true, 
    node: node, 
    app_id: app_id, 
    platform: platform, 
    user_id: user_id} = state) do 
    decr_online_counter(node, app_id, platform, user_id)
    do_stat(state)

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
    decr_online_counter(node, app_id, platform, user_id)
    {:ok, state}
  end
  defp handle_message(%{type: "pause"}, state) do 
    {:ok, state}
  end

  defp handle_message(%{type: "resume"}, %{
    node: node, 
    app_id: app_id, 
    platform: platform, 
    user_id: user_id} = state) do 
    now = Timex.local()
    today = Timex.to_date(now)
    incr_online_counter(node, app_id, platform, user_id)

    new_state = state 
      |> Map.put(:today, today)
      |> Map.put(:join_at, Timex.to_unix(now))
      |> Map.put(:active, true)

    init_stat_data(new_state)

    {:ok, new_state}
  end
  defp handle_message(%{type: "resume"}, state) do 
    {:ok, state}
  end

  def incr_online_counter(node, app_id, platform, user_id) do 
    Exredis.sadd("online_apps", app_id)
    Exredis.sadd(online_key(node, app_id), user_id)
    Exredis.sadd(online_key(node, app_id, platform), user_id)
  end

  def decr_online_counter(node, app_id, platform, user_id) do 
    Exredis.srem(online_key(node, app_id), user_id)
    Exredis.srem(online_key(node, app_id, platform), user_id)
  end


  defp init_stat_data(%{user_id: user_id,
                        app_id: app_id,
                        device_id: device_id,
                        device_model: device_model,
                        os_ver: os,
                        platform: platform,
                        app_user_id: app_user_id,
                        app_user_name: app_user_name,
                        app_user_level: app_user_level,
                        zone_id: zone_id,
                        today: today}) do
    zone_id = "#{zone_id}"
    utc_now = DateTime.utc_now()
    app_user = CachedAppUser.get(app_id, zone_id, user_id, platform) 
    case Repo.update(AppUser.changeset(app_user, %{
      app_user_name: app_user_name,
      app_user_id: app_user_id,
      last_active_at: utc_now,
      app_user_level: app_user_level  
    })) do 
      {:ok, new_app_user} ->
        CachedAppUser.refresh(new_app_user)
        new_app_user
      
      _ ->
        app_user
    end

    CachedAppUserDailyActivity.get(app_user.id, today)

    if is_nil(CachedDevice.get(device_id)) do
      # client may join channel twice at the same time, ignore the second one
      Device.changeset(%Device{}, %{
        id: device_id,
        model: device_model,
        platform: platform,
        os: os}) |> Repo.insert(on_conflict: :nothing)
    end

    app_device = CachedAppDevice.get(app_id, zone_id, device_id, platform)
    CachedAppDeviceDailyActivity.get(app_device.id, today)
    :ok
  end
  defp init_stat_data(_), do: :ok

  defp do_stat(%{app_id: app_id,
                 platform: platform,
                 sdk: sdk,
                 zone_id: zone_id,
                 user_id: user_id,
                 device_id: device_id,
                 today: today,
                 join_at: join_at
                 }) do

    active_seconds = Utils.unix_timestamp - join_at
    info "[STAT] #{today}, #{app_id}, #{zone_id}, #{platform}, #{sdk}, #{user_id}, #{device_id}, #{active_seconds}"

    if active_seconds > 30 do
      utc_now = DateTime.utc_now()

      app_user = CachedAppUser.get(app_id, zone_id, user_id, platform)
      app_device = CachedAppDevice.get(app_id, zone_id, device_id, platform)
      app_user_daily_activity = CachedAppUserDailyActivity.get(app_user.id, today)
      app_device_daily_activity = CachedAppDeviceDailyActivity.get(app_device.id, today)

      new_app_user = AppUser.changeset(app_user, %{
        active_seconds: app_user.active_seconds + active_seconds,
        last_active_at: utc_now,
      }) |> Repo.update!

      CachedAppUser.refresh(new_app_user)

      new_app_device = AppDevice.changeset(app_device, %{
        active_seconds: app_device.active_seconds + active_seconds,
        last_active_at: utc_now,
      }) |> Repo.update!

      CachedAppDevice.refresh(new_app_device)

      new_app_user_daily_activity = AppUserDailyActivity.changeset(app_user_daily_activity, %{
        active_seconds: app_user_daily_activity.active_seconds + active_seconds,
        last_active_at: utc_now,
      }) |> Repo.update!

      CachedAppUserDailyActivity.refresh(new_app_user_daily_activity)

      new_app_device_daily_activity = AppDeviceDailyActivity.changeset(app_device_daily_activity, %{
        active_seconds: app_device_daily_activity.active_seconds + active_seconds,
        last_active_at: utc_now,
      }) |> Repo.update!

      CachedAppDeviceDailyActivity.refresh(new_app_device_daily_activity)
    end
  end
  defp do_stat(_socket), do: :ok

  def dlu_key(date, app_id) do 
    "acs.dlu.#{date}.#{app_id}"
  end
  def dlu_key(date, app_id, platform) do 
    "acs.dlu.#{date}.#{app_id}.#{platform}"
  end

  def dau_key(date, app_id) do 
    "acs.dau.#{date}.#{app_id}"
  end
  def dau_key(date, app_id, platform) do 
    "acs.dau.#{date}.#{app_id}.#{platform}"
  end

  def da2nu_key(date, app_id) do 
    "acs.da2nu.#{date}.#{app_id}"
  end
  def da2nu_key(date, app_id, platform) do 
    "acs.da2nu.#{date}.#{app_id}.#{platform}"
  end

  def dld_key(date, app_id, platform) do 
    "acs.dld.#{date}.#{app_id}.#{platform}"
  end

  def dad_key(date, app_id, platform) do 
    "acs.dad.#{date}.#{app_id}.#{platform}"
  end

  def da2nd_key(date, app_id, platform) do 
    "acs.da2nd.#{date}.#{app_id}.#{platform}"
  end

  def online_key(node, app_id) do 
    "acs.online_counter.#{app_id}.#{node}"
  end
  def online_key(node, app_id, platform) do 
    "acs.ponline_counter.#{app_id}.#{platform}.#{node}"
  end

end
