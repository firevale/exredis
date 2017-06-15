defmodule Acs.RedisAppDeviceDailyActivity do
  require Redis
  require Cachex

  alias   Acs.StatsRepo
  alias   Acs.Stats.AppDeviceDailyActivity

  @cache_key     "fvac.app_device_daily_activity_cache"

  def find(app_device_id, date) do 
    key = "#{@cache_key}.#{app_device_id}.#{date}"

    Cachex.get!(:default, key, fallback: fn(redis_key) -> 
      case Redis.get(redis_key) do 
        :undefined ->
          case StatsRepo.get_by(AppDeviceDailyActivity, app_device_id: app_device_id, date: date) do 
            nil ->  
              {:ok, appDeviceDA} = AppDeviceDailyActivity.changeset(%AppDeviceDailyActivity{},
                %{date: date,
                  app_device_id: app_device_id,
                  active_seconds: 0}
              ) |> StatsRepo.insert
              Redis.setex(key, 3600 * 24, appDeviceDA |> :erlang.term_to_binary |> Base.encode64)
              {:commit, appDeviceDA}

            %AppDeviceDailyActivity{} = appDeviceDA ->
              Redis.setex(key, 3600 * 24, appDeviceDA |> :erlang.term_to_binary |> Base.encode64)
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