defmodule Acs.RedisNeteaseDun do
  require Redis
  require Logger
  require Cachex
  
  ########################################

  @dun_cache_key  "fvac.netease_dun"

  def find(name)  do
    key = "#{@dun_cache_key}.#{name}"
    Cachex.get!(:default, key, fallback: fn(redis_key) -> 
      case Redis.get(redis_key) do
        :undefined ->
          :null
        _raw ->
          :exist
      end
    end)
  end

  def refresh(name)  do
    key = "#{@dun_cache_key}.#{name}"
    Redis.setex(key, 3600 * 24 * 15 , name)
  end

end
