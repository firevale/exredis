defmodule Acs.Cache.CachedWcsUser do
  require Exredis
  require Excache

  alias   Acs.Repo
  alias   Acs.Wcs.WcsUser

  def get(wcs_user_id) do
    Excache.get!(key(wcs_user_id), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case refresh(wcs_user_id) do 
            nil -> {:ignore, nil}
            wcs_user -> {:commit, wcs_user}
          end
        raw ->
          {:commit, raw |> WcsUser.from_redis}
      end
    end)
  end

  def get_by_openid(openid) when is_bitstring(openid) do
    Excache.get!(openid_key(openid), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case Repo.get_by(WcsUser, openid: openid) do 
            %{id: wcs_user_id} -> 
              Exredis.set(redis_key, wcs_user_id) 
              {:commit, get(wcs_user_id)}

            _ ->
              {:ignore, nil} 
          end
          
        wcs_user_id ->
          {:commit, get(wcs_user_id)}
      end
    end)
  end

  def refresh(%WcsUser{id: id, openid: openid} = wcs_user) do 
    Exredis.set(key(id), WcsUser.to_redis(wcs_user))
    Exredis.set(openid_key(openid), id)

    Excache.del(key(id))
    Excache.del(openid_key(openid))

    wcs_user
  end

  def refresh(wcs_user_id) do 
    Excache.del(key(wcs_user_id))
    case Repo.get(WcsUser, wcs_user_id) do 
      %WcsUser{} = wcs_user ->
        refresh(wcs_user)

      _ -> 
        nil
    end
  end

  defp key(id) do 
    "acs.wcs_user.#{id}"
  end

  defp openid_key(openid) do 
    "acs.wcs_user.#{openid}"
  end
end
