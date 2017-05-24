defmodule Acs.RedisAppUser do
  require Redis

  alias   Acs.StatsRepo
  require Cachex
  # import  Ecto
  # import  Ecto.Query

  alias   Acs.AppUser

  @app_user_cache_key     "fvac.app_user_cache"

  def find(app_id, zone_id, user_id) do 
    key = "#{@app_user_cache_key}.#{app_id}.#{zone_id}.#{user_id}"

    Cachex.get!(:mem_cache, key, fallback: fn(redis_key) -> 
      case Redis.get(redis_key) do 
        :undefined ->
          refresh(app_id, zone_id, user_id)

        raw -> 
          raw |> Base.decode64! |> :erlang.binary_to_term
      end
    end)
  end

  def refresh(app_id, zone_id, user_id) do 
    key = "#{@app_user_cache_key}.#{app_id}.#{zone_id}.#{user_id}"
    Cachex.del(:mem_cache, key)
    case StatsRepo.get_by(AppUser, app_id: app_id, user_id: user_id, zone_id: zone_id) do 
      nil ->  
        {:ok, appUser} = AppUser.changeset(%AppUser{}, %{app_id: app_id, user_id: user_id, zone_id: zone_id}) |> StatsRepo.insert
        Redis.setex(key, 3600 * 24, appUser |> :erlang.term_to_binary |> Base.encode64)
        appUser

      %AppUser{} = appUser ->
        Redis.setex(key, 3600 * 24, appUser |> :erlang.term_to_binary |> Base.encode64)
        appUser
    end
  end

end