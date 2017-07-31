defmodule Acs.RedisAdminUser do
  require Redis
  use     LogAlias

  alias   Acs.Repo
  import  Ecto.Query
  alias   Acs.AdminUser
  require Cachex 

  @admin_cache_key      "acs.adminuser.level"
  def get_redis_key(admin_user_id) when is_integer(admin_user_id), do: "#{@admin_cache_key}.#{admin_user_id}" 
  def get_redis_key(admin_user_id, nil) when is_integer(admin_user_id), do: "#{@admin_cache_key}.#{admin_user_id}" 
  def get_redis_key(admin_user_id, app_id) when is_integer(admin_user_id), do:  "#{@admin_cache_key}.#{admin_user_id}.#{app_id}"

  def get_admin_level(admin_user_id, app_id \\ nil)  when is_integer(admin_user_id) do
    key = get_redis_key(admin_user_id, app_id)
    Cachex.get!(:default, key, fallback: fn(redis_key) -> 
      case Redis.get(redis_key) do
        :undefined -> 
          {:commit, refresh(admin_user_id, app_id, false)}
        raw ->
          case Integer.parse(raw) do
            {level, ""} -> {:commit, level}
            _ -> {:commit, 0}
          end
      end
    end)
  end

  def is_admin(user_id) do 
    Cachex.get!(:default, "acs.isadminuser.#{user_id}", fallback: fn(redis_key) -> 
      case Redis.get(redis_key) do 
        :undefined ->
            query = from au in AdminUser,
                    select: count(au.id),
                    where: au.user_id == ^user_id,
                    where: au.active == true

            case Repo.one!(query) do
              0 -> 
                {:ignore, false}
              _ -> 
                Redis.setex(redis_key, 3600, "true")
                {:commit, true}
            end
        _ ->
          {:commit, true}
      end
    end)
  end

  # only when admin_level > 1
  def get_admin_appids(admin_user_id)  when is_integer(admin_user_id) do
    query = 
      from au in AdminUser,
      where: au.user_id == ^admin_user_id,
      where: au.active == true,
      where: au.admin_level >= 1,
      select: au.app_id

    Repo.all(query)
  end

  def refresh(admin_user_id, app_id \\ nil, force_update \\ true)  do
    redis_key = get_redis_key(admin_user_id, app_id)

    if force_update do 
      Cachex.del(:default, redis_key)
    end

    query = 
      from admin in AdminUser,
      where: admin.user_id == ^admin_user_id and admin.active == true
    
    query =
      if app_id  do
        query |> where([admin], admin.admin_level == 1 or admin.app_id == ^app_id) 
              |> select([admin], admin.admin_level) 
      else
        query |> select([admin], min(admin.admin_level) )
      end

    case Repo.one(query) do
      nil -> nil
        Redis.set(redis_key, 0)
        0
      level when is_integer(level) ->
        Redis.set(redis_key, level)
        level
      %AdminUser{} = admin_user ->
        Redis.set(redis_key, admin_user.admin_level)
        admin_user.admin_level
    end
  end
end
