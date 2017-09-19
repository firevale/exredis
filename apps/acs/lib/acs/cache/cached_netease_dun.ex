defmodule Acs.Cache.CachedNeteaseDun do
  require Exredis
  require Excache
  
  ########################################

  @key_base  "acs.netease_dun"

  def get(name)  do
    Excache.get!(key(name), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do
        nil -> nil
        _raw -> :exist
      end
    end)
  end

  def refresh(name)  do
    key(name) |> Exredis.setex(3600 * 24 * 15 , name)
    Exredis.del(name)
  end

  defp key(name), do: "#{@key_base}.#{name}" 

end
