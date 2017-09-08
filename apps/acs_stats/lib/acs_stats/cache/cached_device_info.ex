defmodule AcsStats.Cache.CachedDeviceInfo do
  require Exredis
  require Excache

  alias   AcsStats.Repo
  alias   AcsStats.Devices.DeviceInfo

  @key_base  "acs.device_info"

  def find(model) do 
    key = "#{@key_base}.#{model}"

    Excache.get!(key, fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do 
        nil ->
          case Repo.get(DeviceInfo, model) do 
            nil -> {:ignore, nil}

            %DeviceInfo{} = device_info ->
              Exredis.set(key, DeviceInfo.to_redis(device_info))
              {:commit, device_info}
          end

        raw -> 
          case DeviceInfo.from_redis(raw) do 
            %DeviceInfo{} = device_info ->
              {:commit, device_info}

            _  ->
              {:ignore, nil}
          end
      end
    end)
  end

end
