defmodule Acs.RedisAppUserDailyActivity do
  require Redis
  require Cachex

  alias   Acs.StatsRepo
  alias   Acs.AppUserDailyActivity

  @cache_key     "fvac.app_user_da_cache"

  def find(app_user_id, date) do 
    key = "#{@cache_key}.#{app_user_id}.#{date}"

    Cachex.get!(:mem_cache, key, fallback: fn(redis_key) -> 
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
              appUserDA

            %AppUserDailyActivity{} = appUserDA ->
              Redis.setex(key, 3600 * 24, appUserDA |> :erlang.term_to_binary |> Base.encode64)
              appUserDA
          end

        raw -> 
          raw |> Base.decode64! |> :erlang.binary_to_term
      end
    end)
  end

end