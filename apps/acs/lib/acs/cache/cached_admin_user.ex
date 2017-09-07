defmodule Acs.Cache.CachedAdminUser do
  require Exredis
  require Excache 

  use     Utils.LogAlias

  alias   Acs.Repo
  import  Ecto.Query

  alias   Acs.Admin.AdminUser

  @admin_cache_key      "acs.adminuser.level"


  # TODO: ONLY cache admin user data, 
  def get_admin_level(user_id, app_id \\ nil)  when is_integer(user_id) do
    key = key(user_id, app_id)
    Excache.get!(key, fallback: fn(redis_key) -> 
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

  def is_admin(user_id) do 
    Excache.get!("acs.isadminuser.#{user_id}", fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do 
        nil ->
          query = from au in AdminUser,
                  select: count(au.id),
                  where: au.user_id == ^user_id,
                  where: au.active == true

          case Repo.one!(query) do
            0 -> 
              {:ignore, false}
            _ -> 
              Exredis.setex(redis_key, 3600, "true")
              {:commit, true}
          end
        _ ->
          {:commit, true}
      end
    end)
  end

  # only when admin_level > 1
  # TODO: move to some other place
  def get_admin_appids(user_id)  when is_integer(user_id) do
    query = 
      from au in AdminUser,
      where: au.user_id == ^user_id,
      where: au.active == true,
      where: au.admin_level >= 1,
      select: au.app_id

    Repo.all(query)
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

  defp key(user_id) when is_integer(user_id) do 
    "#{@admin_cache_key}.#{user_id}" 
  end
  defp key(user_id, nil) when is_integer(user_id) do
    "#{@admin_cache_key}.#{user_id}" 
  end
  defp key(user_id, app_id) when is_integer(user_id) do  
    "#{@admin_cache_key}.#{user_id}.#{app_id}"
  end
end
