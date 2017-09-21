defmodule AcsStats.Devices do
  @moduledoc """
  The Devices context.
  """

  import Ecto.Query, warn: false
  require Timex
  use Utils.LogAlias

  alias AcsStats.Repo

  alias AcsStats.Devices.Device
  alias AcsStats.Devices.DeviceInfo
  alias AcsStats.Devices.AppDevice
  alias AcsStats.Devices.AppDeviceDailyActivity

  alias AcsStats.Cache.CachedDevice
  alias AcsStats.Cache.CachedDeviceInfo 
  alias AcsStats.Cache.CachedAppDevice
  alias AcsStats.Cache.CachedAppDeviceDailyActivity

  alias AcsStats.RealtimeMetrics

  def log_device_info(device_id, platform, device_model, os_ver, device_memory_size) do 
    device_info = CachedDeviceInfo.get(device_model) || %DeviceInfo{}
    case DeviceInfo.changeset(device_info, %{id: device_model, total_mem_size: device_memory_size}) do 
      %{changes: changes} when changes == %{} -> 
        :not_changed
      cs ->
        {:ok, device_info} = Repo.insert_or_update(cs)
        CachedDeviceInfo.refresh(device_info)
    end

    device = CachedDevice.get(device_id) || %Device{}    

    case Device.changeset(device, %{id: device_id, model: device_model, platform: platform, os: os_ver}) do 
      %{changes: changes} when changes == %{} -> 
        :not_changed
      cs ->
        {:ok, device} = Repo.insert_or_update(cs)
        CachedDevice.refresh(device)
    end
  end

  def log_app_device(date, app_id, device_id, platform, sdk) do 
    case CachedAppDevice.get(app_id, device_id) do 
      nil -> 
        {:ok, app_device} = AppDevice.changeset(%AppDevice{}, %{
          app_id: app_id,
          device_id: device_id,
          platform: platform,
          sdk: sdk,
          reg_date: Timex.local() |> Timex.to_date(),
          last_active_at: DateTime.utc_now(),
        }) |> Repo.insert()

        RealtimeMetrics.add_new_active_device(date, app_id, platform, app_device.id) 
        RealtimeMetrics.add_active_device(date, app_id, platform, app_device.id) 
        CachedAppDevice.refresh(app_device)

      app_device ->
        {:ok, app_device} = AppDevice.changeset(app_device, %{
          last_active_at: DateTime.utc_now(),
        }) |> Repo.update()

        if RealtimeMetrics.is_yesterday_new_app_device?(date, app_id, platform, app_device.id) do 
          RealtimeMetrics.add_retention_device(date, app_id, platform, app_device.id)
        end

        RealtimeMetrics.add_active_device(date, app_id, platform, app_device.id) 
        CachedAppDevice.refresh(app_device)
    end
  end

  def log_app_device_activity(date, app_id, device_id, active_seconds) do 
    with app_device = %AppDevice{} <- CachedAppDevice.get(app_id, device_id)
    do
      app_device = AppDevice.changeset(app_device, %{
        active_seconds: app_device.active_seconds + active_seconds
      }) |> Repo.update!()
      
      CachedAppDevice.refresh(app_device)

      case CachedAppDeviceDailyActivity.get(app_device.id, date) do 
        nil ->
          {:ok, model} = AppDeviceDailyActivity.changeset(%AppDeviceDailyActivity{}, %{
            app_device_id: app_device.id,
            date: date,
            active_seconds: active_seconds
          }) |> Repo.insert()
          CachedAppDeviceDailyActivity.refresh(model)

        cached ->
          {:ok, model} = AppDeviceDailyActivity.changeset(cached, %{
            active_seconds: cached.active_seconds + active_seconds
          }) |> Repo.update()          
          CachedAppDeviceDailyActivity.refresh(model)
      end
    else 
      nil ->
        error("app_device for #{app_id}.#{device_id} not found")
    end
  end


end
