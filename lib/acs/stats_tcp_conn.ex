defmodule Acs.StatsTcpConn do
  use GenServer
  use LogAlias

  require Redis
  require Utils

  import Ecto.Query

  alias  Acs.StatsRepo 
  alias  Acs.Stats.Device
  alias  Acs.Stats.AppDevice
  alias  Acs.Stats.AppUser
  alias  Acs.Stats.AppUserDailyActivity
  alias  Acs.Stats.AppDeviceDailyActivity
  alias  Acs.RedisAccessToken
  alias  Acs.RedisAppUser
  alias  Acs.RedisDevice
  alias  Acs.RedisAppDevice
  alias  Acs.RedisAppUserDailyActivity
  alias  Acs.RedisAppDeviceDailyActivity

  def set_socket(pid, socket) do
    GenServer.call(pid, {:set_socket, socket})
  end

  def send_msg(app_id, user_id, %{} = msg) do 
    case Process.whereis(String.to_atom("u#{app_id}#{user_id}")) do 
      nil ->
        {:error, :not_exist}
      pid ->
        GenServer.call(pid, {:send_message, Poison.encode!(msg)})
    end
  end
  def send_msg!(app_id, user_id, %{} = msg) do 
    GenServer.call(String.to_atom("u#{app_id}#{user_id}"), {:send_message, Poison.encode!(msg)})
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
  def handle_info({:tcp, _socket, bin}, %{socket: socket} = state) do
    d "received package: #{inspect bin}"
    :inet.setopts(socket, active: :once)
    {:stop, :invalid_msg, state}
  end
  def handle_info({:tcp_closed, _socket}, state) do
    {:stop, :normal, state}
  end
  def handle_info(:heartbeart, %{socket: socket} = state) do
    {:stop, :normal, state}
  end
  def handle_info(info, state) do
    info "stats tcp connection receive info: #{inspect info}"
    {:noreply, state}
  end

  def terminate(reason, %{socket: socket, 
    timer: timer,
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
    timer: timer,
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
  def terminate(reason, %{socket: socket, timer: timer} = state) do
    info "stats tcp connection terminate with reason: #{inspect reason}, #{inspect state}"
    :gen_tcp.close(socket)
    :ok
  end
  def terminate(_reason, %{timer: timer}) do
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
  }, %{node: node} = state) do 
    user_id = String.to_integer("#{user_id}")
    pname = String.to_atom("u#{app_id}#{user_id}") 
    case Process.whereis(pname) do 
      nil -> :ok 
      _pid -> Process.unregister(pname)
    end
    Process.register(self(), pname)

    case RedisAccessToken.find(access_token_id) do
      %{device_id: ^device_id, user_id: ^user_id} -> 
        now = Timex.local()
        today = Timex.to_date(now)
        Redis.sadd(dlu_key(today, app_id), user_id)
        Redis.sadd(dlu_key(today, app_id, platform), user_id)
        Redis.sadd(dld_key(today, app_id, platform), device_id)
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

  defp handle_message(%{type: "updateGameData", payload: %{app_user_id: ""} = payload}, %{node: node} = state) do 
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
    } = payload
  }, %{app_id: app_id, platform: platform, user_id: user_id, device_id: device_id, node: node} = state) do 
    now = Timex.local()
    today = Timex.to_date(now)
    Redis.sadd(dlu_key(today, app_id), user_id)
    Redis.sadd(dau_key(today, app_id), user_id)
    Redis.sadd(dlu_key(today, app_id, platform), user_id)
    Redis.sadd(dau_key(today, app_id, platform), user_id)
    Redis.sadd(dld_key(today, app_id, platform), device_id)
    Redis.sadd(dad_key(today, app_id, platform), device_id)
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
    } = payload
  }, %{app_id: app_id, platform: platform, node: node, device_id: device_id} = state) do 
    Logger.metadata(user_id: user_id)
    now = Timex.local()
    today = Timex.to_date(now)
    Redis.sadd(dlu_key(today, app_id), user_id)
    Redis.sadd(dau_key(today, app_id), user_id)
    Redis.sadd(dlu_key(today, app_id, platform), user_id)
    Redis.sadd(dau_key(today, app_id, platform), user_id)
    Redis.sadd(dld_key(today, app_id, platform), device_id)
    Redis.sadd(dad_key(today, app_id, platform), device_id)

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
    Redis.sadd("online_apps", app_id)
    Redis.sadd(online_key(node, app_id), user_id)
    Redis.sadd(online_key(node, app_id, platform), user_id)
  end

  def decr_online_counter(node, app_id, platform, user_id) do 
    Redis.srem(online_key(node, app_id), user_id)
    Redis.srem(online_key(node, app_id, platform), user_id)
  end

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

  def dld_key(date, app_id, platform) do 
    "acs.dld.#{date}.#{app_id}.#{platform}"
  end
  def dad_key(date, app_id, platform) do 
    "acs.dad.#{date}.#{app_id}.#{platform}"
  end

  def online_key(node, app_id) do 
    "acs.online_counter.#{app_id}.#{node}"
  end
  def online_key(node, app_id, platform) do 
    "acs.ponline_counter.#{app_id}.#{platform}.#{node}"
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
    app_user = RedisAppUser.find(app_id, zone_id, user_id, platform) 
    case StatsRepo.update(AppUser.changeset(app_user, %{
      app_user_name: app_user_name,
      app_user_id: app_user_id,
      last_active_at: utc_now,
      app_user_level: app_user_level  
    })) do 
      {:ok, new_app_user} ->
        key = "acs.app_user_cache.#{app_id}.#{zone_id}.#{user_id}"
        Cachex.set(:default, key, new_app_user)
        Redis.setex(key, 3600*24, AppUser.to_redis(new_app_user))
        new_app_user
      
      _ ->
        app_user
    end

    RedisAppUserDailyActivity.find(app_user.id, today)

    if is_nil(RedisDevice.find(device_id)) do
      # client may join channel twice at the same time, ignore the second one
      Device.changeset(%Device{}, %{
        id: device_id,
        model: device_model,
        platform: platform,
        os: os}) |> StatsRepo.insert(on_conflict: :nothing)
    end

    app_device = RedisAppDevice.find(app_id, zone_id, device_id, platform)
    RedisAppDeviceDailyActivity.find(app_device.id, today)
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

      app_user = RedisAppUser.find(app_id, zone_id, user_id, platform)
      app_device = RedisAppDevice.find(app_id, zone_id, device_id, platform)
      app_user_daily_activity = RedisAppUserDailyActivity.find(app_user.id, today)
      app_device_daily_activity = RedisAppDeviceDailyActivity.find(app_device.id, today)

      new_app_user = AppUser.changeset(app_user, %{
        active_seconds: app_user.active_seconds + active_seconds,
        last_active_at: utc_now,
      }) |> StatsRepo.update!

      RedisAppUser.refresh(new_app_user)

      new_app_device = AppDevice.changeset(app_device, %{
        active_seconds: app_device.active_seconds + active_seconds,
        last_active_at: utc_now,
      }) |> StatsRepo.update!

      RedisAppDevice.refresh(new_app_device)

      new_app_user_daily_activity = AppUserDailyActivity.changeset(app_user_daily_activity, %{
        active_seconds: app_user_daily_activity.active_seconds + active_seconds,
        last_active_at: utc_now,
      }) |> StatsRepo.update!

      RedisAppUserDailyActivity.refresh(new_app_user_daily_activity)

      new_app_device_daily_activity = AppDeviceDailyActivity.changeset(app_device_daily_activity, %{
        active_seconds: app_device_daily_activity.active_seconds + active_seconds,
        last_active_at: utc_now,
      }) |> StatsRepo.update!

      RedisAppDeviceDailyActivity.refresh(new_app_device_daily_activity)
    end
  end
  defp do_stat(_socket), do: :ok
end
