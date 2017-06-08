defmodule Acs.RedisSetting do
  require Redis
  require Logger

  import  Ecto.Query
  
  alias   Acs.Repo
  alias   Acs.AdminSetting
  
  ########################################
  defstruct name: "",
            value: "",
            group: "",
            memo: "",
            active: true

  @setting_cache_key  "fvac.setting_cache"

  def find(name)  do
    redis_key = "#{@setting_cache_key}.#{name}"

    case Redis.get(redis_key) do
      :undefined ->
        refresh(name)
      str ->
        str
    end
  end

  def refresh(name)  do
    redis_key = "#{@setting_cache_key}.#{name}"

    query = from s in AdminSetting, where: s.name == ^name and s.active == true

    case Repo.one(query) do
      nil -> nil

      %AdminSetting{} = setting ->
        Redis.set(redis_key, setting.value)
        setting.value
    end
  end

  def del(name) do
    with redis_key = "#{@setting_cache_key}.#{name}",
      Redis.del(redis_key),
      %AdminSetting{} = setting <- Repo.get_by(AdminSetting, name: name),
      {:ok, _} <- Repo.delete(setting)
    do
      {:ok, "ok"}
    else
      nil -> {:ok, "setting not found"}
      {:error, %{errors: errors}} -> {:error, %{errors: errors}}
    end
  end

end
