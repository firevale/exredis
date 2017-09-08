defmodule Acs.Cache.CachedAppDeviceDailyActivity do
  require Exredis
  require Excache

  alias   AcsStats.Repo
  alias   AcsStats.Devices.AppDeviceDailyActivity

  @key_base  "acs.app_device_daily_activity"

  def refresh(%AppDeviceDailyActivity{} = adda) do 
    key = "#{@key_base}.#{adda.app_device_id}.#{adda.date}"
    Exredis.setex(key, 3600 * 24, AppDeviceDailyActivity.to_redis(adda))
    Excache.del(key)
  end

  def get(app_device_id, date) do 
    key = "#{@key_base}.#{app_device_id}.#{date}"

    Excache.get!(key, fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do 
        nil ->
          case Repo.get_by(AppDeviceDailyActivity, app_device_id: app_device_id, date: date) do 
            nil ->  
              {:ok, appDeviceDA} = AppDeviceDailyActivity.changeset(%AppDeviceDailyActivity{},
                %{date: date,
                  app_device_id: app_device_id,
                  active_seconds: 0}
              ) |> Repo.insert
              Exredis.setex(key, 3600 * 24, appDeviceDA |> :erlang.term_to_binary |> Base.encode64)
              {:commit, appDeviceDA}

            %AppDeviceDailyActivity{} = appDeviceDA ->
              Exredis.setex(key, 3600 * 24, appDeviceDA |> :erlang.term_to_binary |> Base.encode64)
              {:commit, appDeviceDA}
          end

        raw -> 
          case raw |> Base.decode64! |> :erlang.binary_to_term do 
            %AppDeviceDailyActivity{} = app_dda ->
              {:commit, app_dda}
            %{} = old ->
              {:commit, %AppDeviceDailyActivity{
                id: old.id,
                date: old.date,
                active_seconds: old.active_seconds,
                pay_amount: old.pay_amount,
                app_device_id: old.app_device_id,
              }}
          end
      end
    end)
  end

end
