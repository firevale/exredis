defmodule Acs.Cache.CachedAppDevice do
  require Exredis
  require Excache

  alias   AcsStats.Repo
  import  Ecto.Query
  use     Timex

  alias   AcsStats.Devices.AppDevice

  @key_base  "acs.app_device"

  def refresh(%AppDevice{} = app_device) do 
    key = "#{@key_base}.#{app_device.app_id}.#{app_device.zone_id}.#{app_device.device_id}"
    Exredis.setex(key, 3600 * 24, AppDevice.to_redis(app_device))
    Excache.del(key)
  end

  def get(app_id, zone_id, device_id, platform) do 
    key = "#{@key_base}.#{app_id}.#{zone_id}.#{device_id}"

    Excache.get!(key, fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do 
        nil ->
          case Repo.get_by(AppDevice, app_id: app_id, device_id: device_id, zone_id: zone_id) do 
            nil ->  
              {:ok, app_device} = AppDevice.changeset(%AppDevice{}, %{
                app_id: app_id, 
                device_id: device_id, 
                zone_id: zone_id,
                platform: platform,
                reg_date: Timex.local |> Timex.to_date}) |> Repo.insert
              refresh(app_device)
              today = Timex.local() |> Timex.to_date()
              incr_dand(today, app_id, device_id, platform) 
              {:commit, app_device}

            %AppDevice{} = app_device ->
              refresh(app_device)
              {:commit, app_device}
          end

        raw -> 
          case raw |> Base.decode64! |> :erlang.binary_to_term do 
            %AppDevice{} = app_device ->
              {:commit, app_device}
              
            %{} = old_app_device ->
              {:commit, %AppDevice{
                id: old_app_device.id,
                active_seconds: old_app_device.active_seconds,
                pay_amount: old_app_device.pay_amount,
                last_active_at: old_app_device.last_active_at,
                last_paid_at: old_app_device.last_paid_at,
                reg_date: old_app_device.reg_date,
                app_id: old_app_device.app_id,
                zone_id: old_app_device.zone_id,
                device_id: old_app_device.device_id,
                inserted_at: old_app_device.inserted_at,
                updated_at: old_app_device.updated_at,
              }}
          end
      end
    end)
  end

  def incr_dand(today, app_id, device_id, platform) do 
    query = from ad in AppDevice, 
            select: count(1),
            where: ad.app_id == ^app_id,
            where: ad.device_id == ^device_id
            
    case Repo.one!(query) do 
      0 -> 
        Exredis.sadd("acs.dand.#{today}.#{app_id}", device_id) 
        Exredis.sadd("acs.dand.#{today}.#{app_id}.#{platform}", device_id) 
      _ -> 
        :ok
    end
  end

end
