defmodule Acs.RedisAppUser do
  require Redis

  alias   Acs.StatsRepo
  alias   Acs.Stats.AppUser

  require Cachex
  use     Timex

  @app_user_cache_key     "fvac.app_user_cache"

  def find(app_id, zone_id, user_id, platform) do 
    key = "#{@app_user_cache_key}.#{app_id}.#{zone_id}.#{user_id}"

    Cachex.get!(:default, key, fallback: fn(redis_key) -> 
      case Redis.get(redis_key) do 
        :undefined ->
          case StatsRepo.get_by(AppUser, app_id: app_id, user_id: user_id, zone_id: zone_id) do 
            nil ->  
              {:ok, app_user} = AppUser.changeset(%AppUser{}, %{
                app_id: app_id, 
                user_id: user_id, 
                zone_id: zone_id,
                platform: platform,
                reg_date: Timex.local |> Timex.to_date}) |> StatsRepo.insert
              Redis.setex(key, 3600 * 24, app_user |> :erlang.term_to_binary |> Base.encode64)
              {:commit, app_user}

            %AppUser{} = app_user ->
              Redis.setex(key, 3600 * 24, app_user |> :erlang.term_to_binary |> Base.encode64)
              {:commit, app_user}
          end

        raw -> 
          case raw |> Base.decode64! |> :erlang.binary_to_term do 
            %AppUser{} = app_user ->
              {:commit, app_user}

            %{} = old_app_user ->
              {:commit, %AppUser{
                id: old_app_user.id,
                app_user_id: old_app_user.app_user_id,
                app_user_name: old_app_user.app_user_name,
                app_user_level: old_app_user.app_user_level,
                app_id: old_app_user.app_id,
                user_id: old_app_user.user_id,
                zone_id: old_app_user.zone_id,
                active_seconds: old_app_user.active_seconds,
                pay_amount: old_app_user.pay_amount,
                reg_date: old_app_user.reg_date,
                last_paid_at: old_app_user.last_paid_at,
                last_active_at: old_app_user.last_active_at,
                inserted_at: old_app_user.inserted_at,
                updated_at: old_app_user.updated_at,
              }}
          end
      end
    end)
  end

end