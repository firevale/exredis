defmodule Acs.AppChannel do
  use Acs.Web, :channel

  require Utils

  def join("app:" <> _, %{"access_token" => access_token, 
                          "user_id" => user_id, 
                          "app_id" => app_id, 
                          "device_id" => device_id,
                          "device_model" => device_model,
                          "os_ver" => os_ver,
                          "platform" => platform,
                          "sdk" => sdk,
                          "app_user_id" => app_user_id, 
                          "app_user_name" => app_user_name, 
                          "app_user_level" => app_user_level,
                          "zone_id" => zone_id,
                          "zone_name" => zone_name} = payload, socket) do
    d "receive channel join request, payload: #{inspect payload, pretty: true}"
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
      Logger.error "received unauthorized payload: #{inspect payload, pretty: true}"
      {:error, %{reason: "unauthorized"}}
    end
  end

  def join(_channel, payload, _socket) do 
    Logger.error "can't handle join with payload: #{inspect payload}"
    {:error, %{reason: "unknown payload"}}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("reset", %{"access_token" => access_token, 
                           "user_id" => user_id,
                           "app_user_id" => app_user_id, 
                           "app_user_name" => app_user_name, 
                           "app_user_level" => app_user_level,
                           "zone_id" => zone_id,
                           "zone_name" => zone_name
                          } = payload, socket) do
      d "receive reset channel request with payload: #{inspect payload, pretty: true}"
      Logger.metadata(user_id: user_id) 
      do_stat(socket)

      {date, _} = :calendar.local_time
      today = date |> Date.from_erl!
      socket = init_stat_data(payload, today, socket)

      {:noreply, socket |> assign(:user_id, user_id)
                        |> assign(:join_at, Utils.unix_timestamp)
                        |> assign(:zone_id, "#{zone_id}") 
                        |> assign(:active, true)
                        |> assign(:today, today)
      }
  end

  def handle_in("pause", _payload, socket) do
      d "channel paused"
      do_stat(socket)
      {:noreply, socket |> assign(:active, false) }
  end

  def handle_in("resume", _payload, socket) do
      d "channel resumes"
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

  def terminate(reason, %{assigns: %{active: true}} = socket) do 
    d "channel termiate with reason: #{inspect reason}"
    do_stat(socket)
    :ok
  end
  def terminate(_reason, _socket), do: :ok

  defp init_stat_data(%{"access_token" => access_token, 
                        "user_id" => user_id, 
                        "app_id" => app_id,
                        "device_id" => device_id,
                        "device_model" => device_model,
                        "os_ver" => os,
                        "sdk" => sdk,
                        "platform" => platform,
                        "app_user_id" => app_user_id, 
                        "app_user_name" => app_user_name, 
                        "app_user_level" => app_user_level,
                        "zone_id" => zone_id,
                        "zone_name" => zone_name}, today, socket) do 
    zone_id = "#{zone_id}"
    app_user = case Repo.get_by(AppUser, app_id: app_id, user_id: user_id, zone_id: zone_id) do 
                nil ->
                  AppUser.changeset(%AppUser{}, %{app_user_id: app_user_id, 
                                                  app_user_name: app_user_name,
                                                  app_user_level: app_user_level,
                                                  zone_id: zone_id,
                                                  sdk: sdk,
                                                  active_seconds: 0,
                                                  app_id: app_id,
                                                  user_id: user_id}) |> Repo.insert!
                %AppUser{} = app_user ->
                  AppUser.changeset(app_user, %{app_user_name: app_user_name, 
                                                app_user_id: app_user_id,
                                                app_user_level: app_user_level}) |> Repo.update!
              end      

    app_user_daily_activity = case Repo.get_by(AppUserDailyActivity, app_user_id: app_user.id, date: today) do 
                                nil ->
                                  AppUserDailyActivity.changeset(%AppUserDailyActivity{}, %{date: today, app_user_id: app_user.id, active_seconds: 0}) |> Repo.insert!
                                v -> v
                              end

    if Repo.get(Device, device_id) == nil do 
      Device.changeset(%Device{}, %{id: device_id, model: device_model, platform: platform, os: os}) |> Repo.insert!
    end

    app_device = case Repo.get_by(AppDevice, app_id: app_id, device_id: device_id, zone_id: zone_id) do 
                   nil ->
                     AppDevice.changeset(%AppDevice{}, %{app_id: app_id, device_id: device_id, zone_id: zone_id}) |> Repo.insert!

                   %AppDevice{} = app_device ->
                     app_device
                 end  

    app_device_daily_activity = case Repo.get_by(AppDeviceDailyActivity, app_device_id: app_device.id, date: today) do 
                                  nil ->
                                    AppDeviceDailyActivity.changeset(%AppDeviceDailyActivity{}, %{date: today, app_device_id: app_user.id, active_seconds: 0}) |> Repo.insert!
                                  v -> v
                                end              

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
    Logger.info "[STAT] #{today}, #{app_id}, #{zone_id}, #{platform}, #{sdk}, #{user_id}, #{device_id}, #{active_seconds}"

    if active_seconds > 30 do
      AppUser.changeset(app_user, %{active_seconds: app_user.active_seconds + active_seconds}) |> Repo.update!
      AppDevice.changeset(app_device, %{active_seconds: app_device.active_seconds + active_seconds}) |> Repo.update!
      AppUserDailyActivity.changeset(app_user_daily_activity, %{active_seconds: app_user_daily_activity.active_seconds + active_seconds}) |> Repo.update!
      AppDeviceDailyActivity.changeset(app_device_daily_activity, %{active_seconds: app_device_daily_activity.active_seconds + active_seconds}) |> Repo.update!
    end
  end
  defp do_stat(_socket), do: :ok

  # Add authorization logic here as required.
  defp authorized?(%{"access_token" => access_token_id, 
                     "device_id" => device_id,
                     "user_id" => user_id}) do
    user_id = String.to_integer(user_id)
    case RedisAccessToken.find(access_token_id) do 
      %{device_id: ^device_id, user_id: ^user_id} = token -> true
      _ -> false
    end
  end
end
