defmodule AcsStats.Cache.CachedAppUser do
  require Exredis
  require Excache

  alias   AcsStats.Repo
  import  Ecto.Query
  use     Timex

  alias   AcsStats.Users.AppUser

  @key_base  "acs.app_user"

  def refresh(%AppUser{} = app_user) do 
    Exredis.setex(key(app_user), 3600 * 24, AppUser.to_redis(app_user))
    Excache.del(key(app_user))
  end

  def get(app_id, zone_id, user_id) do 
    Excache.get!(key(app_id, zone_id, user_id), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do 
        nil ->
          case Repo.get_by(AppUser, app_id: app_id, zone_id: "#{zone_id}", user_id: "#{user_id}") do 
            nil -> 
              {:ignore, nil}

            %AppUser{} = app_user ->
              refresh(app_user)
              {:commit, app_user}
          end

        raw -> 
          {:commit, AppUser.from_redis(raw)}
      end
    end)
  end

  defp key(app_id, zone_id, user_id), do: "#{@key_base}.#{app_id}.#{zone_id}.#{user_id}" 
  defp key(%AppUser{app_id: app_id, zone_id: zone_id, user_id: user_id}), do: "#{@key_base}.#{app_id}.#{zone_id}.#{user_id}"  

end
