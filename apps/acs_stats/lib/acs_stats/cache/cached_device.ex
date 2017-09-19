defmodule AcsStats.Cache.CachedDevice do
  require Exredis
  require Excache

  alias   AcsStats.Repo
  alias   AcsStats.Devices.Device

  @key_base  "acs.device"

  def get(device_id) do 
    Excache.get!(key(device_id), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do 
        nil ->
          case Repo.get(Device, device_id) do 
            nil -> {:ignore, nil}

            %Device{} = device ->
              Exredis.setex(redis_key, 3600 * 24, Device.to_redis(device))
              {:commit, device}
          end

        raw -> 
          Device.from_redis(raw)
      end
    end)
  end

  def refresh(%Device{} = device) do 
    Exredis.setex(key(device), 3600 * 24, Device.to_redis(device))
    Excache.del(key(device))
  end

  defp key(device_id) when is_bitstring(device_id), do: "#{@key_base}.#{device_id}" 
  defp key(%Device{id: device_id}), do: "#{@key_base}.#{device_id}" 

end
