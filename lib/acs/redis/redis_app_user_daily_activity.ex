defmodule Acs.RedisAppUserDailyActivity do
  require Redis
  require Cachex

  alias   Acs.StatsRepo
  alias   Acs.Stats.AppUserDailyActivity

  @cache_key     "fvac.app_user_da_cache"

  def find(app_user_id, date) do 
    key = "#{@cache_key}.#{app_user_id}.#{date}"

    Cachex.get!(:default, key, fallback: fn(redis_key) -> 
      case Redis.get(redis_key) do 
        :undefined ->
          case StatsRepo.get_by(AppUserDailyActivity, app_user_id: app_user_id, date: date) do 
            nil ->  
              {:ok, appUserDA} = AppUserDailyActivity.changeset(%AppUserDailyActivity{},
                %{date: date,
                  app_user_id: app_user_id,
                  active_seconds: 0}
              ) |> StatsRepo.insert
              Redis.setex(key, 3600 * 24, appUserDA |> :erlang.term_to_binary |> Base.encode64)
              {:commit, appUserDA}

            %AppUserDailyActivity{} = appUserDA ->
              Redis.setex(key, 3600 * 24, appUserDA |> :erlang.term_to_binary |> Base.encode64)
              {:commit, appUserDA}
          end

        raw -> 
          case raw |> Base.decode64! |> :erlang.binary_to_term do 
            %AppUserDailyActivity{} = app_user_daily_activity ->
              {:commit, app_user_daily_activity}
              
            %{} = old ->
              {:commit, %AppUserDailyActivity{
                id: old.id,
                date: old.date,
                active_seconds: old.active_seconds,
                pay_amount: old.pay_amount,
                app_user_id: old.app_user_id,
              }}
          end
      end
    end)
  end

end