defmodule Acs.AdminAuth do
  require Exredis
  require Excache 

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.Admin.AdminUser

  def is_admin(user_id) do 
    key = "acs.admin.ids"
    if Exredis.sismember(key, user_id) == 1 do 
      true
    else 
      if Exredis.scard(key) == 0 do 
        refresh_admin_ids()
        Exredis.sismember(key, user_id) == 1
      else 
        false
      end
    end
  end

  def refresh_admin_ids() do 
    query = 
      from au in AdminUser, 
        where: au.active == true,
        select: au.user_id,
        distinct: true
  
    for user_id <- Repo.all(query) do 
      Exredis.sadd("acs.admin.ids", user_id)
    end
  end

  def get_admin_level(user_id, app_id \\ nil)  when is_integer(user_id) do
    Excache.get!(key(user_id, app_id), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do
        nil -> 
          {:commit, refresh_admin_level(user_id, app_id)}

        raw ->
          case Integer.parse(raw) do
            {level, ""} -> {:commit, level}
            _ -> {:commit, 0}
          end
      end
    end)
  end

  def refresh_admin_level(user_id, app_id)  do
    redis_key = key(user_id, app_id)

    query = 
      from admin in AdminUser,
      where: admin.user_id == ^user_id and admin.active == true
    
    query =
      if app_id  do
        query |> where([admin], admin.admin_level == 1 or admin.app_id == ^app_id) 
              |> select([admin], admin.admin_level) 
      else
        query |> select([admin], min(admin.admin_level) )
      end

    case Repo.one(query) do
      nil -> nil
        Exredis.set(redis_key, 0)
        Excache.del(redis_key)
        0

      level when is_integer(level) ->
        Exredis.set(redis_key, level)
        Excache.del(redis_key)
        level

      %AdminUser{} = admin_user ->
        Exredis.set(redis_key, admin_user.admin_level)
        Excache.del(redis_key)
        admin_user.admin_level
    end
  end

  @key_base  "acs.admin.level"
  defp key(user_id, nil) when is_integer(user_id) do
    "#{@key_base}.#{user_id}" 
  end
  defp key(user_id, app_id) when is_integer(user_id) do  
    "#{@key_base}.#{user_id}.#{app_id}"
  end



end
