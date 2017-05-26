defmodule Acs.RedisAppDevice do
  require Redis

  alias   Acs.StatsRepo
  require Cachex
  # import  Ecto
  # import  Ecto.Query

  alias   Acs.AppDevice

  @app_device_cache_key     "fvac.app_device_cache"

  def find(app_id, zone_id, device_id) do 
    key = "#{@app_device_cache_key}.#{app_id}.#{zone_id}.#{device_id}"

    Cachex.get!(:default, key, fallback: fn(redis_key) -> 
      case Redis.get(redis_key) do 
        :undefined ->
          case StatsRepo.get_by(AppDevice, app_id: app_id, device_id: device_id, zone_id: zone_id) do 
            nil ->  
              {:ok, appDevice} = AppDevice.changeset(%AppDevice{}, %{app_id: app_id, device_id: device_id, zone_id: zone_id}) |> StatsRepo.insert
              Redis.setex(key, 3600 * 24, appDevice |> :erlang.term_to_binary |> Base.encode64)
              appDevice

            %AppDevice{} = appDevice ->
              Redis.setex(key, 3600 * 24, appDevice |> :erlang.term_to_binary |> Base.encode64)
              appDevice
          end

        raw -> 
          raw |> Base.decode64! |> :erlang.binary_to_term
      end
    end)
  end

end