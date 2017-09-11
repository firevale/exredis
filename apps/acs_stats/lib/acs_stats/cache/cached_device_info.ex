defmodule AcsStats.Cache.CachedDeviceInfo do
  require Exredis
  require Excache

  alias   AcsStats.Repo
  alias   AcsStats.Devices.DeviceInfo

  @key_base  "acs.device_info"

  def get(id) do 
    Excache.get!(key(id), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do 
        nil ->
          case Repo.get(DeviceInfo, id) do 
            nil -> {:ignore, nil}

            %DeviceInfo{} = device_info ->
              Exredis.set(redis_key, DeviceInfo.to_redis(device_info))
              {:commit, device_info}
          end

        raw -> 
          DeviceInfo.from_redis(raw)
      end
    end)
  end

  def refresh(%DeviceInfo{} = device_info) do 
    Exredis.set(key(device_info), DeviceInfo.to_redis(device_info))
    Excache.del(key(device_info))
  end


  defp key(id) when is_bitstring(id), do: "#{@key_base}.#{id}" 
  defp key(%DeviceInfo{id: id}), do: "#{@key_base}.#{id}"  

end
