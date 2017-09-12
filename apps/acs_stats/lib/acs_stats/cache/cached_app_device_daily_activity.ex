defmodule AcsStats.Cache.CachedAppDeviceDailyActivity do
  require Exredis
  require Excache

  alias   AcsStats.Repo
  alias   AcsStats.Devices.AppDeviceDailyActivity

  @key_base  "acs.app_device_daily_activity"

  def refresh(%AppDeviceDailyActivity{} = adda) do 
    Exredis.setex(key(adda), 3600 * 24, AppDeviceDailyActivity.to_redis(adda))
    Excache.del(key(adda))
  end

  def get(app_device_id, date) do 
    Excache.get!(key(app_device_id, date), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do 
        nil ->
          case Repo.get_by(AppDeviceDailyActivity, app_device_id: app_device_id, date: date) do 
            nil ->  
              {:ignore, nil}

            %AppDeviceDailyActivity{} = appDeviceDA ->
              refresh(appDeviceDA)
              {:commit, appDeviceDA}
          end

        raw -> 
          AppDeviceDailyActivity.from_redis(raw)
      end
    end)
  end

  defp key(app_device_id, date), do: "#{@key_base}.#{app_device_id}.#{date}" 
  defp key(%AppDeviceDailyActivity{app_device_id: app_device_id, date: date}), do: "#{@key_base}.#{app_device_id}.#{date}"  

end
