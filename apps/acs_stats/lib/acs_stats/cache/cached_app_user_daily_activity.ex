defmodule AcsStats.Cache.CachedAppUserDailyActivity do
  require Exredis
  require Excache

  alias   AcsStats.Repo
  alias   AcsStats.Users.AppUserDailyActivity

  @key_base  "acs.app_user_daily_activity"

  def refresh(%AppUserDailyActivity{} = auda) do 
    Exredis.setex(key(auda), 3600 * 24, AppUserDailyActivity.to_redis(auda))
    Excache.del(key(auda))
  end

  def get(app_user_id, date) do 
    Excache.get!(key(app_user_id, date), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do 
        nil ->
          case Repo.get_by(AppUserDailyActivity, app_user_id: app_user_id, date: date) do 
            nil -> 
              {:ignore, nil}

            %AppUserDailyActivity{} = appUserDA ->
              refresh(appUserDA)
              {:commit, appUserDA}
          end

        raw -> 
          {:commit, AppUserDailyActivity.from_redis(raw)}
      end
    end)
  end

  defp key(app_user_id, date), do: "#{@key_base}.#{app_user_id}.#{date}" 
  defp key(%AppUserDailyActivity{app_user_id: app_user_id, date: date}), do: "#{@key_base}.#{app_user_id}.#{date}"  

end
