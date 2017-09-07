defmodule Acs.Cache.CachedAdminSetting do
  require Exredis
  require Excache

  import  Ecto.Query
  
  alias   Acs.Repo
  alias   Acs.Admin.Setting
  
  @key_base  "acs.admin_setting"

  def get(name)  do
    key = "#{@key_base}.#{name}"
    Excache.get!(key, fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do
        nil ->
          case refresh(name) do 
            nil -> {:ignore, nil}
            v -> {:commit, v}
          end
        v ->
          {:commit, v}
      end
    end)
  end

  def refresh(name)  do
    key = "#{@key_base}.#{name}"

    Excache.del(key)

    query = from s in Setting, 
      where: s.name == ^name,
      where: s.active == true

    case Repo.one(query) do
      nil -> nil

      %Setting{value: value} = setting ->
        Exredis.setex(key, 7200, value)
        value
    end
  end

  def del(name) do
    with key <- "#{@key_base}.#{name}",
      Exredis.del(key),
      Excache.del(key),
      %Setting{} = setting <- Repo.get_by(Setting, name: name),
      {:ok, _} <- Repo.delete(setting)
    do
      {:ok, "ok"}
    else
      nil -> {:ok, "setting not found"}
      {:error, %{errors: errors}} -> {:error, %{errors: errors}}
    end
  end

end
