defmodule AcsWeb.AppChannel do
  use AcsWeb, :channel

  require Utils
  require AcsStats
  alias   Acs.Auth

  @heartbeart_duration 20000

  def join(_, %{"access_token" => ""} = payload, _socket) do 
    info "receive bad channel join request, #{inspect payload}"
    {:error, %{reason: "bad request"}}
  end
  def join(_, %{"user_id" => ""} = payload, _socket) do 
    info "receive bad channel join request, #{inspect payload}"
    {:error, %{reason: "bad request"}}
  end

  # sdk can join channel anytime, postpond game data info 
  # that means, app_user_id will be empty 
  def join("app:" <> _, %{"access_token" => _access_token,
                          "user_id" => user_id,
                          "app_id" => app_id,
                          "device_id" => device_id,
                          "device_model" => device_model,
                          "platform" => platform,
                          "os_ver" => os_ver,
                          "sdk" => sdk,
                          "app_user_id" => ""} = payload, socket) do
    info "receive channel join request, payload: #{inspect payload}"
    if authorized?(payload) do
      Logger.metadata(user_id: user_id)
      Logger.metadata(app_id: app_id)
      Logger.metadata(device_id: device_id)

      node = System.get_env("NODE") || "acs"

      timer = case Map.get(payload, "version") do 
        x when x in [2, "2"] -> 
          {:ok, timer} = :timer.send_interval(@heartbeart_duration, :heartbeart)
          timer
        _ -> 
          nil 
      end

      today = Timex.local |> Timex.to_date
      AcsStats.log_app_login_user(today, app_id, user_id, platform)

      {:ok, socket |> assign(:user_id, user_id)
                   |> assign(:app_id, app_id)
                   |> assign(:device_id, device_id)
                   |> assign(:device_model, device_model)
                   |> assign(:join_at, Utils.unix_timestamp())
                   |> assign(:platform, platform)
                   |> assign(:os_ver, os_ver)
                   |> assign(:sdk, sdk)
                   |> assign(:today, today)
                   |> assign(:node, node)
                   |> assign(:hb_interval, timer)
                   |> assign(:active, false)
                   |> assign(:version, 2)
      }
    else
      error "received unauthorized payload: #{inspect payload}"
      {:error, %{reason: "unauthorized"}}
    end
  end
  def join("app:" <> _, %{"access_token" => _access_token,
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
                          "zone_name" => _zone_name} = payload, socket) do

    info "receive channel join request, payload: #{inspect payload}"

    if authorized?(payload) do
      Logger.metadata(user_id: user_id)
      Logger.metadata(app_id: app_id)
      Logger.metadata(device_id: device_id)

      node = System.get_env("NODE") || "acs"

      today = Timex.local() |> Timex.to_date()

      AcsStats.log_app_login_user(today, app_id, user_id, platform)
      AcsStats.add_online_user(node, app_id, platform, user_id)
      AcsStats.log_app_user(today, app_id, zone_id, user_id, platform, sdk, app_user_id, app_user_name, app_user_level)
      AcsStats.log_app_device(today, app_id, device_id, platform, sdk)

      {:ok, socket |> assign(:user_id, user_id)
                   |> assign(:app_id, app_id)
                   |> assign(:device_id, device_id)
                   |> assign(:device_model, device_model)
                   |> assign(:join_at, Utils.unix_timestamp())
                   |> assign(:platform, platform)
                   |> assign(:os_ver, os_ver)
                   |> assign(:app_user_id, app_user_id)
                   |> assign(:sdk, sdk)
                   |> assign(:zone_id, "#{zone_id}")
                   |> assign(:active, true)
                   |> assign(:today, today)
                   |> assign(:node, node)
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
                           "app_user_id" => app_user_id,
                           "app_user_name" => _app_user_name,
                           "app_user_level" => _app_user_level,
                           "zone_id" => zone_id,
                           "zone_name" => _zone_name
                          } = payload, 
                          %{assigns: %{node: node,
                                       app_id: app_id, 
                                       user_id: last_user_id, 
                                       app_user_id: last_app_user_id,
                                       platform: platform}} =  socket) do
    info "receive reset channel request with payload: #{inspect payload}"
    Logger.metadata(user_id: user_id)

    today = Timex.local() |> Timex.to_date()

    AcsStats.log_app_login_user(today, app_id, user_id, platform)

    if user_id != last_user_id do 
      AcsStats.remove_online_user(node, app_id, platform, user_id)
    end

    log_stats_activities(socket)

    {:noreply, socket 
      |> assign(:user_id, user_id)
      |> assign(:active, true)
      |> assign(:join_at, Utils.unix_timestamp())
      |> assign(:app_user_id, app_user_id)
      |> assign(:today, today)
      |> assign(:zone_id, "#{zone_id}") 
    }
  end
  def handle_in("reset", payload, socket) do
    info "receive unknown reset, payload: #{inspect payload}, assigns: #{inspect socket.assigns}"
    {:noreply, socket} 
  end

  def handle_in("updateGameData", %{"app_user_id" => ""} = payload, socket) do 
    info "receive invalid update game data payload: #{inspect payload}"
    {:noreply, socket}
  end
  def handle_in("updateGameData", %{"app_user_id" => app_user_id,
                                    "app_user_name" => app_user_name,
                                    "app_user_level" => app_user_level,
                                    "zone_id" => zone_id,
                                    } = payload, 
                                    %{assigns: %{app_id: app_id, 
                                                 user_id: user_id,
                                                 device_id: device_id, 
                                                 device_model: device_model,
                                                 os_ver: os_ver,
                                                 node: node,
                                                 platform: platform,
                                                 sdk: sdk}} =  socket) do
    info "receive update game data request with payload: #{inspect payload}"
    now = Timex.local()
    today = Timex.to_date(now)

    AcsStats.add_online_user(node, app_id, platform, user_id)
    AcsStats.log_app_user(today, app_id, zone_id, user_id, platform, sdk, app_user_id, app_user_name, app_user_level)
    AcsStats.log_app_device(today, app_id, device_id, platform, sdk)

    {:noreply, 
      socket 
        |> assign(:zone_id, zone_id)
        |> assign(:today, today)
        |> assign(:join_at, Timex.to_unix(now))
        |> assign(:active, true)
        |> assign(:app_user_id, app_user_id)
    }
  end
  def handle_in("updateGameData", payload, socket) do
    info "receive unknown update game data, payload: #{inspect payload}, assigns: #{inspect socket.assigns}"
    {:noreply, socket} 
  end

  def handle_in("pause", _payload, %{assigns: %{
    node: node,
    user_id: user_id,
    app_id: app_id, 
    platform: platform}} = socket) do
    info "channel paused, assigns: #{inspect socket.assigns}"
    AcsStats.remove_online_user(node, app_id, platform, user_id)
    if socket.assigns[:active] do 
      log_stats_activities(socket) 
    end
    {:noreply, socket |> assign(:active, false) }
  end
  def handle_in("pause", _payload, socket) do 
    info "unknown channel paused, assigns: #{inspect socket.assigns}"
    {:noreply, socket}
  end

  def handle_in("resume", _payload, %{assigns: %{
    node: node,
    user_id: user_id, 
    app_id: app_id, 
    platform: platform}} = socket) do
    info "channel resume, assigns: #{inspect socket.assigns}"
    AcsStats.add_online_user(node, app_id, platform, user_id)
    {:noreply, socket |> assign(:join_at, Utils.unix_timestamp)
                      |> assign(:active, true)
    }
  end
  def handle_in("resume", _payload, socket) do 
    info "unknown channel resume, assigns: #{inspect socket.assigns}"
    {:noreply, socket}
  end

  def handle_in("heartbeart", _payload, %{assigns: %{active: true, version: 2, hb_timeout: nil}} = socket) do 
    {:noreply, socket}
  end
  def handle_in("heartbeart", _payload, %{assigns: %{active: true, version: 2, hb_timeout: timer}} = socket) do 
    :timer.cancel(timer) 
    {:noreply, socket |> assign(:hb_timeout, nil)}
  end

  def handle_in(_command, _payload, socket), do: {:noreply, socket}

  def handle_info(:heartbeart, %{assigns: %{active: true, version: 2}} = socket) do
    push(socket, "heartbeart", %{})  
    {:ok, timer} = :timer.send_after(5000, :heartbeart_timeout)
    {:noreply, socket |> assign(:hb_timeout, timer)}
  end
  def handle_info(:heartbeart, socket) do
    {:noreply, socket}
  end
  def handle_info(:heartbeart_timeout, %{assigns: %{
    active: true, 
    version: 2}} = socket) do
    {:stop, :normal, socket}
  end
  def handle_info(:heartbeart_timeout, socket) do
    {:noreply, socket}
  end

  def terminate(_reason, %{assigns: %{
    active: true, 
    node: node,
    user_id: user_id,
    app_id: app_id,
    platform: platform}} = socket) do
    info "active channel terminate with reason: #{inspect socket.assigns}"
    AcsStats.remove_online_user(node, app_id, platform, user_id)
    log_stats_activities(socket)
    case Map.get(socket.assigns, :hb_interval) do 
      nil -> :do_nothing
      timer -> :timer.cancel(timer)
    end
    :ok
  end
  def terminate(_reason, %{assigns: %{
    active: false,
    node: node,
    user_id: user_id,
    app_id: app_id,
    platform: platform}} = socket) do
    info "inactive channel terminate with reason: #{inspect socket.assigns}"
    AcsStats.remove_online_user(node, app_id, platform, user_id)
    case Map.get(socket.assigns, :hb_interval) do 
      nil -> :do_nothing
      timer -> :timer.cancel(timer)
    end
    :ok
  end
  def terminate(_reason, socket) do
    info "channel terminated with: #{inspect socket.assigns}"
    case Map.get(socket.assigns, :hb_interval) do 
      nil -> :do_nothing
      timer -> :timer.cancel(timer)
    end
    :ok
  end
  
  defp log_stats_activities(%{assigns: %{
    app_id: app_id,
    zone_id: zone_id,
    user_id: user_id,
    device_id: device_id,
    active: true,
    today: today,
    platform: platform,
    sdk: sdk,
    join_at: join_at}}) do
    active_seconds = Utils.unix_timestamp - join_at
    info "[STAT] #{today}, #{app_id}, #{zone_id}, #{platform}, #{sdk}, #{user_id}, #{device_id}, #{active_seconds}"

    if active_seconds > 30 do
      AcsStats.log_app_user_activity(today, app_id, zone_id, user_id, active_seconds)
      AcsStats.log_app_device_activity(today, app_id, device_id, active_seconds)
    end
  end
  defp log_stats_activities(_socket), do: :ok

  # Add authorization logic here as required.
  defp authorized?(%{"user_id" => ""}) do 
    error "invalid empty user_id to join app channel"
    false
  end
  defp authorized?(%{"access_token" => access_token_id,
                     "device_id" => device_id,
                     "user_id" => user_id}) do
    user_id = String.to_integer(user_id)
    case Auth.get_access_token(access_token_id) do
      %{device_id: ^device_id, user_id: ^user_id} -> true
      _ -> false
    end
  end
  defp authorized?(payload) do 
    error "invalid app channel authorization payload: #{inspect payload}"
    false
  end

end
