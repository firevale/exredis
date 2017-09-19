defmodule Acs.Cache.CachedAppWcpConfig do
  require Exredis
  require Excache

  alias   Acs.Repo
  alias   Acs.Wcp.AppWcpConfig

  def get(app_id) when is_bitstring(app_id) do
    Excache.get!(key(app_id), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case refresh(app_id) do 
            nil -> {:ignore, nil}
            wcp_config -> {:commit, wcp_config}
          end
        raw ->
          {:commit, raw |> AppWcpConfig.from_redis}
      end
    end)
  end

  def refresh(app_id) when is_bitstring(app_id) do
    case Repo.get_by(AppWcpConfig, app_id: app_id) do 
      %AppWcpConfig{} = wcp_config ->
        refresh(wcp_config)
      _ -> nil
    end
  end

  def refresh(%AppWcpConfig{} = config) do
    Exredis.set(key(config.app_id), AppWcpConfig.to_redis(config))
    Excache.del(key(config.app_id))
    config
  end

  defp key(app_id) do 
    "acs.app_wcp_config.#{app_id}"
  end

end
