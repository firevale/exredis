defmodule Acs.Cache.CachedAppWcpUser do
  require Exredis
  require Excache

  alias   Acs.Repo
  alias   Acs.Wcp.AppWcpUser

  def get(wcp_user_id) do
    Excache.get!(key(wcp_user_id), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case refresh(wcp_user_id) do 
            nil -> {:ignore, nil}
            wcp_user -> {:commit, wcp_user}
          end
        raw ->
          {:commit, raw |> AppWcpUser.from_redis}
      end
    end)
  end

  def get_by_openid(app_id, openid) when is_bitstring(app_id) and is_bitstring(openid) do
    Excache.get!(openid_key(app_id, openid), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case Repo.get_by(AppWcpUser, app_id: app_id, openid: openid) do 
            %{id: wcp_user_id} -> 
              Exredis.set(redis_key, wcp_user_id) 
              {:commit, get(wcp_user_id)}
            _ ->
              {:ignore, nil} 
          end
          
        wcp_user_id ->
          {:commit, get(wcp_user_id)}
      end
    end)
  end

  def get_by_email(app_id, email) when is_bitstring(app_id) and is_bitstring(email) do
    Excache.get!(email_key(app_id, email), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case Repo.get_by(WcsUser, app_id: app_id, tf_email: email) do 
            %{id: wcp_user_id} -> 
              Exredis.set(redis_key, wcp_user_id) 
              {:commit, get(wcp_user_id)} 
            _ ->
              {:ignore, nil} 
          end

        wcp_user_id ->
          {:commit, get(wcp_user_id)}
      end
    end)
  end

  def refresh(%AppWcpUser{id: id, app_id: app_id, openid: openid} = wcp_user) do 
    Exredis.set(key(id), AppWcpUser.to_redis(wcp_user))
    Exredis.set(openid_key(app_id, openid), id)

    Excache.del(key(id))
    Excache.del(openid_key(app_id, openid))

    if not is_nil(wcp_user.tf_email) do 
      Exredis.set(email_key(app_id, wcp_user.tf_email), id)
      Excache.del(email_key(app_id, wcp_user.tf_email))
    end

    wcp_user
  end

  def refresh(wcp_user_id) do 
    Excache.del(key(wcp_user_id))
    case Repo.get(AppWcpUser, wcp_user_id) do 
      %AppWcpUser{} = wcp_user ->
        refresh(wcp_user)
      _ -> 
        nil
    end
  end

  defp key(id) do 
    "acs.app_wcp_user.#{id}"
  end

  defp openid_key(app_id, openid) do 
    "acs.app_wcp_user.#{app_id}.#{openid}"
  end

  defp email_key(app_id, email) do 
    "acs.app_wcp_user.email.#{app_id}.#{email}"
  end
end
