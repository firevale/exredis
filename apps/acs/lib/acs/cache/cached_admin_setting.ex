defmodule Acs.Cache.CachedAdminSetting do
  require Exredis
  require Excache

  import  Ecto.Query
  
  alias   Acs.Repo
  alias   Acs.Admin.Setting
  
  @key_base  "acs.admin_setting"

  def get(name)  do
    Excache.get!(key(name), fallback: fn(redis_key) -> 
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
    query = from s in Setting, 
      where: s.name == ^name,
      where: s.active == true

    case Repo.one(query) do
      nil -> nil

      %Setting{value: value} ->
        Exredis.set(key(name), value)
        Excache.del(key(name))
        value
    end
  end

  def del(name) do
    with %Setting{} = setting <- Repo.get_by(Setting, name: name),
         {:ok, _} <- Repo.delete(setting)
    do
      Exredis.del(key(name))
      Excache.del(key(name))
      {:ok, "ok"}
    else
      nil -> {:ok, "setting not found"}
      {:error, %{errors: errors}} -> {:error, %{errors: errors}}
    end
  end

  defp key(name), do: "#{@key_base}.#{name}"

end
