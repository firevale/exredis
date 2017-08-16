defmodule Acs.RedisAppDevice do
  require Redis

  alias   Acs.StatsRepo
  alias   Acs.Stats.AppDevice

  require Cachex
  use     Timex

  @app_device_cache_key     "fvac.app_device_cache"

  def refresh(%AppDevice{} = app_device) do 
    key = "#{@app_user_cache_key}.#{app_device.app_id}.#{app_device.zone_id}.#{app_device.device_id}"
    Redis.setex(key, 3600 * 24, AppDevice.to_redis(app_device))
    Cachex.del(:default, key) # force other node refresh from redis
  end

  def find(app_id, zone_id, device_id, platform) do 
    key = "#{@app_device_cache_key}.#{app_id}.#{zone_id}.#{device_id}"

    Cachex.get!(:default, key, fallback: fn(redis_key) -> 
      case Redis.get(redis_key) do 
        :undefined ->
          case StatsRepo.get_by(AppDevice, app_id: app_id, device_id: device_id, zone_id: zone_id) do 
            nil ->  
              {:ok, appDevice} = AppDevice.changeset(%AppDevice{}, %{
                app_id: app_id, 
                device_id: device_id, 
                zone_id: zone_id,
                platform: platform,
                reg_date: Timex.local |> Timex.to_date}) |> StatsRepo.insert
              Redis.setex(key, 3600 * 24, AppDevice.to_redis(appDevice))
              {:commit, appDevice}

            %AppDevice{} = appDevice ->
              Redis.setex(key, 3600 * 24, AppDevice.to_redis(appDevice))
              {:commit, appDevice}
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

end