defmodule AcsStats.Cache.CachedAppUserDailyActivity do
  require Exredis
  require Excache

  alias   AcsStats.Repo
  alias   AcsStats.Users.AppUserDailyActivity

  @key_base  "acs.app_user_daily_activity"

  def refresh(%AppUserDailyActivity{} = auda) do 
    key = "#{@key_base}.#{auda.app_user_id}.#{auda.date}"
    Exredis.setex(key, 3600 * 24, AppUserDailyActivity.to_redis(auda))
    Excache.del(key)
  end

  def get(app_user_id, date) do 
    key = "#{@key_base}.#{app_user_id}.#{date}"

    Excache.get!(key, fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do 
        nil ->
          case Repo.get_by(AppUserDailyActivity, app_user_id: app_user_id, date: date) do 
            nil ->  
              {:ok, appUserDA} = AppUserDailyActivity.changeset(%AppUserDailyActivity{},
                %{date: date,
                  app_user_id: app_user_id,
                  active_seconds: 0}
              ) |> Repo.insert
              Exredis.setex(key, 3600 * 24, appUserDA |> :erlang.term_to_binary |> Base.encode64)
              {:commit, appUserDA}

            %AppUserDailyActivity{} = appUserDA ->
              Exredis.setex(key, 3600 * 24, appUserDA |> :erlang.term_to_binary |> Base.encode64)
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
