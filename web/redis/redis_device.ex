defmodule Acs.RedisDevice do
  require Redis

  alias   Acs.StatsRepo

  use     LogAlias
  alias   Acs.Device

  @device_cache_key     "fvac.device_cache"

  def find(device_id) do 
    key = "#{@device_cache_key}.#{device_id}"

    Cachex.get!(:mem_cache, key, fallback: fn(redis_key) -> 
      case Redis.get(redis_key) do 
        :undefined ->
          case StatsRepo.get(Device, device_id) do 
            nil -> nil

            %Device{} = device ->
              Redis.setex(key, 3600 * 24, device |> :erlang.term_to_binary |> Base.encode64)
              device 
          end

        raw -> 
          raw |> Base.decode64! |> :erlang.binary_to_term
      end
    end)
  end
end