defmodule AcsStats.Cache.CachedAppDevice do
  require Exredis
  require Excache

  alias   AcsStats.Repo
  import  Ecto.Query
  use     Timex

  alias   AcsStats.Devices.AppDevice

  @key_base  "acs.app_device"

  def refresh(%AppDevice{} = app_device) do 
    Exredis.setex(key(app_device), 3600 * 24, AppDevice.to_redis(app_device))
    Excache.del(key(app_device))
  end

  def get(app_id, device_id) do 
    Excache.get!(key(app_id, device_id), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do 
        nil ->
          case Repo.get_by(AppDevice, app_id: app_id, device_id: device_id) do 
            nil ->  
              {:ignore, nil}

            %AppDevice{} = app_device ->
              refresh(app_device)
              {:commit, app_device}
          end

        raw -> 
          {:commit, AppDevice.from_redis(raw)}
      end
    end)
  end

  defp key(app_id, device_id), do: "#{@key_base}.#{app_id}.#{device_id}" 
  defp key(%AppDevice{app_id: app_id, device_id: device_id}), do: "#{@key_base}.#{app_id}.#{device_id}"  

end
