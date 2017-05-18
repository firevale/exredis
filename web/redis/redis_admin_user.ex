defmodule Acs.RedisAdminUser do
  require Redis
  use     LogAlias

  alias   Acs.Repo
  import  Ecto.Query
  alias   Acs.AdminUser
  require Logger

  @admin_cache_key      "acs.adminuser.level"
  def get_redis_key(admin_user_id, app_id \\ nil)  when is_integer(admin_user_id) do
    if app_id do
      "#{@admin_cache_key}.#{admin_user_id}.#{app_id}"
    else
       "#{@admin_cache_key}.#{admin_user_id}"
    end 
  end

  def get_admin_level(admin_user_id, app_id \\ nil)  when is_integer(admin_user_id) do
     redis_key = get_redis_key(admin_user_id, app_id)
    case Redis.get(redis_key) do
      :undefined ->
        refresh(admin_user_id, app_id)
      raw ->
         case Integer.parse(raw) do
          {level,""} ->
            level
          _ ->
            0
          end
    end
  end

  # only when admin_level > 1
  def get_admin_appids(admin_user_id)  when is_integer(admin_user_id) do
    query = 
      from au in AdminUser,
      where: au.user_id == ^admin_user_id and au.active == true and au.admin_level>0,
      select: au.app_id

    Repo.all(query)
  end

  def refresh(admin_user_id, app_id \\ nil)  do
    redis_key = get_redis_key(admin_user_id, app_id)
    query = 
      from admin in AdminUser,
      where: admin.user_id == ^admin_user_id and admin.active == true
    
    query =
      if app_id  do
        where(query,[admin], admin.admin_level == 1 or admin.app_id == ^app_id)
      else
        select(query,[admin], min(admin.admin_level) )
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
