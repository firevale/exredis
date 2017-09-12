defmodule Acs.AdminAuth do
  require Exredis
  require Excache 

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.Admin.AdminUser

  def list_admin_app_ids(user_id) when is_integer(user_id) do
    query = 
      from au in AdminUser,
        where: au.user_id == ^user_id,
        where: au.active == true,
        where: au.admin_level >= 1,
        select: au.app_id

    Repo.all(query)
  end

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
        distinct: au.user_id 
  
    for user_id <- Repo.all(query) do 
      Exredis.sadd("acs.admin.ids", user_id)
    end
  end

  def get_admin_level(user_id, app_id \\ nil)  when is_integer(user_id) do
    Excache.get!(key(user_id, app_id), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do
        nil -> 
          {:commit, refresh(user_id, app_id, false)}

        raw ->
          case Integer.parse(raw) do
            {level, ""} -> {:commit, level}
            _ -> {:commit, 0}
          end
      end
    end)
  end

  def refresh(user_id, app_id \\ nil, force_update \\ true)  do
    redis_key = key(user_id, app_id)

    if force_update do 
      Excache.del(redis_key)
    end

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
        0
      level when is_integer(level) ->
        Exredis.set(redis_key, level)
        level
      %AdminUser{} = admin_user ->
        Exredis.set(redis_key, admin_user.admin_level)
        admin_user.admin_level
    end
  end

  @key_base      "acs.adminuser.level"
  defp key(user_id) when is_integer(user_id) do 
    "#{@key_base}.#{user_id}" 
  end
  defp key(user_id, nil) when is_integer(user_id) do
    "#{@key_base}.#{user_id}" 
  end
  defp key(user_id, app_id) when is_integer(user_id) do  
    "#{@key_base}.#{user_id}.#{app_id}"
  end



end
