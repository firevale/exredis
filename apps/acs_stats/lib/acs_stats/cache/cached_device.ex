defmodule Acs.Cache.CachedDevice do
  require Exredis
  require Excache

  alias   AcsStats.Repo
  alias   AcsStats.Devices.Device

  @key_base  "acs.device"

  def get(device_id) do 
    key = "#{@key_base}.#{device_id}"

    Excache.get!(key, fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do 
        nil ->
          case Repo.get(Device, device_id) do 
            nil -> {:ignore, nil}

            %Device{} = device ->
              Exredis.setex(key, 3600 * 24, Device.to_redis(device))
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
