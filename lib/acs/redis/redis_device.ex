defmodule Acs.RedisDevice do
  require Redis
  require Cachex

  alias   Acs.StatsRepo

  use     LogAlias
  alias   Acs.Stats.Device

  @device_cache_key     "fvac.device_cache"

  def find(device_id) do 
    key = "#{@device_cache_key}.#{device_id}"

    Cachex.get!(:default, key, fallback: fn(redis_key) -> 
      case Redis.get(redis_key) do 
        :undefined ->
          case StatsRepo.get(Device, device_id) do 
            nil -> {:ignore, nil}

            %Device{} = device ->
              Redis.setex(key, 3600 * 24, Device.to_redis(device))
              {:commit, device}
          end

        raw -> 
          case Device.from_redis(raw) do 
            %Device{} = device ->
              {:commit, device}

            %{} = old_device ->
              {:commit, %Device{
                id: old_device.id, 
                model: old_device.model, 
                platform: old_device.platform, 
                os: old_device.os,
                inserted_at: old_device.inserted_at,
                updated_at: old_device.updated_at}}
          end
      end
    end)
  end
end