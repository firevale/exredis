defmodule Acs.Cache.CachedUserSdkBindings do
  require Exredis
  require Excache

  alias   Acs.Repo
  import  Ecto.Query, warn: false
  alias   Acs.Accounts.UserSdkBinding

  @key_base     "acs.user.sdkbindings"

  def get(user_id) do
    Excache.get!(key(user_id), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case refresh(user_id) do 
            nil -> {:ignore, nil}
            v -> {:commit, v}
          end

        raw ->
          {:commit, Poison.decode!(raw, keys: :atoms)}
      end
    end)
  end

  def refresh(user_id) do
    query = from s in UserSdkBinding,
            where: s.user_id == ^user_id,
            select: map(s, [:sdk, :sdk_user_id, :nickname])
    bindings = Repo.all(query) 
    Exredis.setex(key(user_id), 3600 * 24, Poison.encode!(bindings))
    Excache.del(key(user_id))
    bindings
  end


  defp key(user_id), do: "#{@key_base}.#{user_id}" 

end
