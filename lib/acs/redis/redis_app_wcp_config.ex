defmodule Acs.RedisAppWcpConfig do
  require Redis
  require Cachex

  alias   Acs.Repo
  alias   Acs.AppWcpConfig

  def find(app_id) when is_bitstring(app_id) do
    Cachex.get!(:default, key(app_id), fallback: fn(redis_key) ->    
      case Redis.get(redis_key) do
        :undefined -> 
          case refresh(app_id) do 
            nil -> {:ignore, nil}
            wcp_config -> {:commit, wcp_config}
          end
        raw ->
          {:commit, raw |> AppWcpConfig.from_json}
      end
    end)
  end

  def refresh(app_id) when is_bitstring(app_id) do
    Cachex.del(:default, key(app_id))
    case Repo.get_by(AppWcpConfig, app_id: app_id) do 
      %AppWcpConfig{} = wcp_config ->
        Redis.set(key(app_id), AppWcpConfig.to_json(wcp_config))
        wcp_config
      _ -> nil
    end
  end

  defp key(app_id) do 
    "acs.app_wcp_config.#{app_id}"
  end

end
