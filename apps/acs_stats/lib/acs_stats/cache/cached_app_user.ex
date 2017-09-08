defmodule Acs.Cache.CachedAppUser do
  require Exredis
  require Excache

  alias   AcsStats.Repo
  import  Ecto.Query
  use     Timex

  alias   AcsStats.Users.AppUser

  @key_base  "acs.app_user"

  def refresh(%AppUser{} = app_user) do 
    key = "#{@key_base}.#{app_user.app_id}.#{app_user.zone_id}.#{app_user.user_id}"
    Exredis.setex(key, 3600 * 24, AppUser.to_redis(app_user))
    Excache.del(key)
  end

  def get(app_id, zone_id, user_id, platform) do 
    key = "#{@key_base}.#{app_id}.#{zone_id}.#{user_id}"

    Excache.get!(key, fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do 
        nil ->
          case Repo.get_by(AppUser, app_id: app_id, user_id: user_id, zone_id: zone_id) do 
            nil ->  
              today = Timex.local |> Timex.to_date
              {:ok, app_user} = AppUser.changeset(%AppUser{}, %{
                app_id: app_id, 
                user_id: user_id, 
                zone_id: zone_id,
                platform: platform,
                reg_date: today}) |> Repo.insert!              
              refresh(app_user)
              incr_danu(today, app_id, user_id, platform) 
              {:ignore, app_user}

            %AppUser{} = app_user ->
              Exredis.setex(key, 3600 * 24, AppUser.to_redis(app_user))
              {:commit, app_user}
          end

        raw -> 
          case AppUser.from_redis(raw) do 
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

  def incr_danu(today, app_id, user_id, platform) do 
    query = from au in AppUser, 
            select: count(1),
            where: au.app_id == ^app_id,
            where: au.user_id == ^user_id
            
    case Repo.one!(query) do 
      0 -> 
        Exredis.sadd("acs.danu.#{today}.#{app_id}", user_id) 
        Exredis.sadd("acs.danu.#{today}.#{app_id}.#{platform}", user_id) 
      _ -> 
        :ok
    end
  end

end
