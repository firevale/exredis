defmodule Acs.Cache.CachedAdminSetting do
  require Exredis
  require Excache

  import  Ecto.Query
  
  alias   Acs.Repo
  alias   Acs.Admin.Setting
  
  @key_base  "acs.admin_setting"

  def get(app_id, name)  do
    Excache.get!(key(app_id, name), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do
        nil ->
          case refresh(app_id, name) do 
            nil -> {:ignore, nil}
            v -> {:commit, v.value}
          end
        v ->
          {:commit, v}
      end
    end)
  end

  def get_fat(app_id, name)  do
    Excache.get!(fat_key(app_id, name), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do
        nil ->
          case refresh(app_id, name) do 
            nil -> {:ignore, nil}
            v -> {:commit, v}
          end
        v ->
          {:commit, Setting.from_redis(v)}
      end
    end)
  end

  def refresh(app_id, name)  do
    query = from s in Setting, 
      where: s.app_id == ^app_id and s.name == ^name and s.active == true

    case Repo.one(query) do
      nil -> nil

      %Setting{} = setting ->
        Exredis.set(key(app_id, name), setting.value)
        Exredis.set(fat_key(app_id, name), Setting.to_redis(setting))
        Excache.del(key(app_id, name))
        Excache.del(fat_key(app_id, name))
        Excache.del(group_key(app_id, setting.group))
        setting
    end
  end

  def del(app_id, name) do
    with %Setting{} = setting <- Repo.get_by(Setting, name: name, app_id: app_id),
         {:ok, _} <- Repo.delete(setting)
    do
      Exredis.del(key(app_id, name))
      Excache.del(key(app_id, name))
      Excache.del(group_key(app_id, setting.group))
      {:ok, "ok"}
    else
      nil -> {:ok, "setting not found"}
      {:error, %{errors: errors}} -> {:error, %{errors: errors}}
    end
  end

  def list_group(app_id,group_name) do 
    Excache.get!(group_key(app_id, group_name), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do
        nil ->
          query = from s in Setting,
            select: s.name,
            where: s.app_id == ^app_id and s.group == ^group_name,
            order_by: [{:desc, s.id}]
          setting_names = Repo.all(query)
          Exredis.set(redis_key, Poison.encode!(setting_names))
          settings = for name <- setting_names, do: get(app_id, name)
          {:commit, settings}
        raw ->
          settings = for name <- Poison.decode!(raw), do: get(app_id, name)
          {:commit, settings}
      end
    end)
  end

  defp key(app_id, name), do: "#{@key_base}.#{app_id}.#{name}"
  defp fat_key(app_id, name), do: "#{@key_base}.#{app_id}.fat.#{name}"
  defp group_key(app_id, group_name), do: "#{@key_base}.#{app_id}.group.#{group_name}"

end
