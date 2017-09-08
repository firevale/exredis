defmodule Acs.Cache.CachedForum do
  require Exredis
  require Excache

  alias   Acs.Repo

  alias   Acs.Forums.Forum

  @key_base     "acs.forum"

  def get(forum_id) do
    Excache.get!(key(forum_id), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case refresh(forum_id) do 
            nil -> {:ignore, nil}
            forum -> {:commit, forum}
          end

        raw ->
          {:commit, raw |> Forum.from_redis}
      end
    end)
  end

  def refresh(forum_id) do
    redis_key = "#{@key_base}.#{forum_id}"

    case Repo.get(Forum, forum_id) do 
      %Forum{} = forum ->
        Exredis.set(key(forum_id), Forum.to_redis(forum))
        key(forum_id) |> Excache.del # force all nodes to reload from redis
        forum
      _ -> nil
    end
  end

  defp key(forum_id), do: "#{@key_base}.#{forum_id}" 

end