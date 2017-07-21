defmodule Acs.RedisDeviceInfo do
  require Redis
  require Cachex

  alias   Acs.StatsRepo

  use     LogAlias
  alias   Acs.Stats.DeviceInfo

  @device_cache_key     "acs.device_info_cache"

  def find(model) do 
    key = "#{@device_cache_key}.#{model}"

    Cachex.get!(:default, key, fallback: fn(redis_key) -> 
      case Redis.get(redis_key) do 
        :undefined ->
          case StatsRepo.get(DeviceInfo, model) do 
            nil -> {:ignore, nil}

            %DeviceInfo{} = device_info ->
              Redis.set(key, DeviceInfo.to_redis(device_info))
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