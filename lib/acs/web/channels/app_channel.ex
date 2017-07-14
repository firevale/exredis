defmodule Acs.Web.AppChannel do
  use Acs.Web, :channel

  require Utils
  alias   Acs.RedisAppUser
  alias   Acs.RedisDevice
  alias   Acs.RedisAppDevice
  alias   Acs.RedisAppUserDailyActivity
  alias   Acs.RedisAppDeviceDailyActivity

  def join("app:" <> _, %{"access_token" => _access_token,
                          "user_id" => user_id,
                          "app_id" => app_id,
                          "device_id" => device_id,
                          "device_model" => _device_model,
                          "os_ver" => _os_ver,
                          "platform" => platform,
                          "sdk" => sdk,
                          "app_user_id" => _app_user_id,
                          "app_user_name" => _app_user_name,
                          "app_user_level" => _app_user_level,
                          "zone_id" => zone_id,
                          "zone_name" => _zone_name} = payload, socket) do
    info "receive channel join request, payload: #{inspect payload}"

    incr_online_counter(app_id, device_id, user_id, platform, zone_id)

    if authorized?(payload) do
      Logger.metadata(user_id: user_id)
      Logger.metadata(app_id: app_id)
      Logger.metadata(device_id: device_id)

      {date, _} = :calendar.local_time
      today = date |> Date.from_erl!

      socket = init_stat_data(payload, today, socket)

      {:ok, socket |> assign(:user_id, user_id)
                   |> assign(:app_id, app_id)
                   |> assign(:device_id, device_id)
                   |> assign(:join_at, Utils.unix_timestamp)
                   |> assign(:platform, platform)
                   |> assign(:sdk, sdk)
                   |> assign(:zone_id, "#{zone_id}")
                   |> assign(:active, true)
                   |> assign(:today, today)
      }
    else
      error "received unauthorized payload: #{inspect payload}"
      {:error, %{reason: "unauthorized"}}
    end
  end

  def join(_channel, payload, _socket) do
    error "can't handle join with payload: #{inspect payload}"
    {:error, %{reason: "unknown payload"}}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("reset", %{"access_token" => _access_token,
                           "user_id" => user_id,
                           "app_user_id" => _app_user_id,
                           "app_user_name" => _app_user_name,
                           "app_user_level" => _app_user_level,
                           "zone_id" => zone_id,
                           "zone_name" => _zone_name
                          } = payload, 
                          %{assigns: %{app_id: app_id, 
                                       device_id: device_id, 
                                       platform: platform, 
                                       zone_id: last_zone_id}} =  socket) do
    info "receive reset channel request with payload: #{inspect payload}"
    Logger.metadata(user_id: user_id)

    decr_online_counter(app_id, device_id, platform, last_zone_id)
    incr_online_counter(app_id, device_id, user_id, platform, zone_id)

    do_stat(socket)

    today = Timex.local() |> Timex.to_date()
    socket = init_stat_data(payload, today, socket)

    {:noreply, socket |> assign(:user_id, user_id)
                      |> assign(:join_at, Utils.unix_timestamp)
                      |> assign(:zone_id, "#{zone_id}")
                      |> assign(:active, true)
                      |> assign(:today, today)
    }
  end

  def handle_in("pause", _payload, %{assigns: %{
    active: true, 
    device_id: device_id, 
    app_id: app_id, 
    platform: platform, 
    zone_id: zone_id}} = socket) do

    info "channel paused, device_id: #{device_id}"
    decr_online_counter(app_id, device_id, platform, zone_id)
    do_stat(socket) 
    {:noreply, socket |> assign(:active, false) }
  end

  def handle_in("resume", _payload, %{assigns: %{
    active: false, 
    device_id: device_id, 
    user_id: user_id, 
    app_id: app_id, 
    platform: platform, 
    zone_id: zone_id}} = socket) do
    info "channel resume, device_id: #{device_id}, user_id: #{user_id}, app_id: #{app_id}"
    incr_online_counter(app_id, device_id, user_id, platform, zone_id)
    {:noreply, socket |> assign(:join_at, Utils.unix_timestamp)
                      |> assign(:active, true)
    }
  end

  def handle_in(_command, _payload, socket), do: {:noreply, socket}

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (weblogs:lobby).
  # def handle_in("shout", payload, socket) do
  #   broadcast socket, "shout", payload
  #   {:noreply, socket}
  # end

  def terminate(reason, %{assigns: %{
    active: true, 
    device_id: device_id, 
    app_id: app_id,
    platform: platform,
    zone_id: zone_id}} = socket) do
    info "active channel termiate with reason: #{inspect reason}, device_id: #{device_id}, app_id: #{app_id}"
    decr_online_counter(app_id, device_id, platform, zone_id)
    do_stat(socket)
    :ok
  end
  def terminate(reason, %{assigns: %{
    device_id: device_id, 
    app_id: app_id,
    platform: platform,
    zone_id: zone_id}} = socket) do
    info "inactive channel termiate with reason: #{inspect reason}, device_id: #{device_id}, app_id: #{app_id}"
    decr_online_counter(app_id, device_id, platform, zone_id)
    :ok
  end
  def terminate(_reason, _socket), do: :ok
  
  defp init_stat_data(%{"access_token" => _access_token,
                        "user_id" => user_id,
                        "app_id" => app_id,
                        "device_id" => device_id,
                        "device_model" => device_model,
                        "os_ver" => os,
                        "sdk" => _sdk,
                        "platform" => platform,
                        "app_user_id" => app_user_id,
                        "app_user_name" => app_user_name,
                        "app_user_level" => app_user_level,
                        "zone_id" => zone_id,
                        "zone_name" => _zone_name}, today, socket) do
    zone_id = "#{zone_id}"
    utc_now = DateTime.utc_now()
    app_user = RedisAppUser.find(app_id, zone_id, user_id, platform)
    app_user = %{app_user | app_user_name: app_user_name,
                            app_user_id: app_user_id,
                            last_active_at: utc_now,
                            app_user_level: app_user_level}

    app_user_daily_activity = RedisAppUserDailyActivity.find(app_user.id, today)

    if is_nil(RedisDevice.find(device_id)) do
      # client may join channel twice at the same time, ignore the second one
      Device.changeset(%Device{}, %{
        id: device_id,
        model: device_model,
        platform: platform,
        os: os}) |> StatsRepo.insert(on_conflict: :nothing)
    end

    app_device = RedisAppDevice.find(app_id, zone_id, device_id, platform)
    app_device_daily_activity = RedisAppDeviceDailyActivity.find(app_device.id, today)

    socket |> assign(:app_user, app_user)
           |> assign(:app_device, app_device)
           |> assign(:app_user_daily_activity, app_user_daily_activity)
           |> assign(:app_device_daily_activity, app_device_daily_activity)
  end

  defp do_stat(%{assigns: %{app_id: app_id,
                            platform: platform,
                            sdk: sdk,
                            zone_id: zone_id,
                            user_id: user_id,
                            device_id: device_id,
                            today: today,
                            join_at: join_at,
                            app_user: app_user,
                            app_device: app_device,
                            app_user_daily_activity: app_user_daily_activity,
                            app_device_daily_activity: app_device_daily_activity}}) do
    active_seconds = Utils.unix_timestamp - join_at
    info "[STAT] #{today}, #{app_id}, #{zone_id}, #{platform}, #{sdk}, #{user_id}, #{device_id}, #{active_seconds}"

    if active_seconds > 0 do
      utc_now = DateTime.utc_now()

      AppUser.changeset(app_user, %{
        active_seconds: app_user.active_seconds + active_seconds,
        last_active_at: utc_now,
      }) |> StatsRepo.update!

      AppDevice.changeset(app_device, %{
        active_seconds: app_device.active_seconds + active_seconds,
        last_active_at: utc_now,
      }) |> StatsRepo.update!

      AppUserDailyActivity.changeset(app_user_daily_activity, %{
        active_seconds: app_user_daily_activity.active_seconds + active_seconds,
        last_active_at: utc_now,
      }) |> StatsRepo.update!

      AppDeviceDailyActivity.changeset(app_device_daily_activity, %{
        active_seconds: app_device_daily_activity.active_seconds + active_seconds,
        last_active_at: utc_now,
      }) |> StatsRepo.update!
    end
  end
  defp do_stat(_socket), do: :ok

  # Add authorization logic here as required.
  defp authorized?(%{"user_id" => ""}) do 
    error "invalid empty user_id to join app channel"
    false
  end
  defp authorized?(%{"access_token" => access_token_id,
                     "device_id" => device_id,
                     "user_id" => user_id}) do
    user_id = String.to_integer(user_id)
    case RedisAccessToken.find(access_token_id) do
      %{device_id: ^device_id, user_id: ^user_id} -> true
      _ -> false
    end
  end
  defp authorized?(payload) do 
    error "invalid app channel authorization payload: #{inspect payload}"
    false
  end

  defp incr_online_counter(app_id, device_id, user_id, platform, zone_id) do 
    node_name = System.get_env("ACS_NODE_NAME")
    online_redis_key = "online_counter.#{app_id}.#{node_name}"
    Redis.hset(online_redis_key, device_id, user_id)
    online_redis_key = "ponline_counter.#{app_id}.#{platform}.#{node_name}"
    Redis.hset(online_redis_key, device_id, user_id)
    online_redis_key = "zonline_counter.#{app_id}.#{zone_id}.#{node_name}"
    Redis.hset(online_redis_key, device_id, user_id)
  end

  defp decr_online_counter(app_id, device_id, platform, zone_id) do 
    node_name = System.get_env("ACS_NODE_NAME")
    online_redis_key = "online_counter.#{app_id}.#{node_name}"
    Redis.hdel(online_redis_key, device_id)
    online_redis_key = "ponline_counter.#{app_id}.#{platform}.#{node_name}"
    Redis.hdel(online_redis_key, device_id)
    online_redis_key = "zonline_counter.#{app_id}.#{zone_id}.#{node_name}"
    Redis.hdel(online_redis_key, device_id)
  end
end
