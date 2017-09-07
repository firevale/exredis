defmodule Acs.Cache.CachedAppWcpUser do
  require Exredis
  require Excache

  alias   Acs.Repo
  alias   Acs.Wcp.AppWcpUser

  def get(app_id, open_id) when is_bitstring(app_id) and is_bitstring(open_id) do
    Excache.get!(key(app_id, open_id), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case refresh(app_id, open_id) do 
            nil -> {:ignore, nil}
            wcp_user -> {:commit, wcp_user}
          end
        raw ->
          {:commit, raw |> AppWcpUser.from_redis}
      end
    end)
  end

  def find_by_email(app_id, email) when is_bitstring(app_id) and is_bitstring(email) do
    Excache.get!(email_key(app_id, email), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case Repo.get_by(AppWcpUser, app_id: app_id, tf_email: email) do 
            %AppWcpUser{} = wcp_user ->
              Excache.del(email_key(app_id, wcp_user.tf_email))
              Exredis.set(email_key(app_id, wcp_user.tf_email), AppWcpUser.to_redis(wcp_user))
              {:commit, wcp_user}
            _ ->
              {:ignore, nil}
          end

        raw ->
          {:commit, raw |> AppWcpUser.from_redis}
      end
    end)
  end

  def refresh(app_id, open_id) when is_bitstring(app_id) and is_bitstring(open_id) do
    Excache.del(key(app_id, open_id))
    case Repo.get_by(AppWcpUser, app_id: app_id, openid: open_id) do 
      %AppWcpUser{} = wcp_user ->
        refresh(wcp_user)
      _ -> 
        nil
    end
  end

  def refresh(%AppWcpUser{app_id: app_id, openid: open_id} = wcp_user) do 
    Exredis.set(key(app_id, open_id), AppWcpUser.to_redis(wcp_user))
    if not is_nil(wcp_user.tf_email) do 
      Excache.del(email_key(app_id, wcp_user.tf_email))
      Exredis.set(email_key(app_id, wcp_user.tf_email), AppWcpUser.to_redis(wcp_user))
    end
    wcp_user
  end

  def clear_cache(app_id, open_id, email) do 
    Excache.del(email_key(app_id, email)) 
    Excache.del(key(app_id, open_id)) 
    Exredis.del(email_key(app_id, email))
    Exredis.del(key(app_id, open_id))
  end

  defp key(app_id, open_id) do 
    "acs.app_wcp_user.#{app_id}.#{open_id}"
  end

  defp email_key(app_id, email) do 
    "acs.app_wcp_user.email.#{app_id}.#{email}"
  end
end
