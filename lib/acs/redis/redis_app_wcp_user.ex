defmodule Acs.RedisAppWcpUser do
  require Redis
  require Cachex

  alias   Acs.Repo
  alias   Acs.AppWcpUser

  def find(app_id, open_id) when is_bitstring(app_id) and is_bitstring(open_id) do
    Cachex.get!(:default, key(app_id, open_id), fallback: fn(redis_key) ->    
      case Redis.get(redis_key) do
        :undefined -> 
          case refresh(app_id, open_id) do 
            nil -> {:ignore, nil}
            wcp_user -> {:commit, wcp_user}
          end
        raw ->
          {:commit, raw |> AppWcpUser.from_redis}
      end
    end)
  end

  def refresh(app_id, open_id) when is_bitstring(app_id) and is_bitstring(open_id) do
    Cachex.del(:default, key(app_id, open_id))
    case Repo.get_by(AppWcpUser, app_id: app_id, open_id: open_id) do 
      %AppWcpUser{} = wcp_user ->
        Redis.set(key(app_id, open_id), AppWcpUser.to_redis(wcp_user))
        wcp_user
      _ -> nil
    end
  end

  defp key(app_id, open_id) do 
    "acs._app_wcp_user.#{app_id}.#{open_id}"
  end

end
