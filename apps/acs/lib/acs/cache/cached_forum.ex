defmodule Acs.Cache.CachedForum do
  require Exredis
<<<<<<< HEAD
  use     Utils.LogAlias
=======
  require Excache
>>>>>>> 0842e000362e27faba0424bbdedcfc8b16ed5c28

  alias   Acs.Repo

  alias   Acs.Forums.Forum

<<<<<<< HEAD
  @key_base   "acs.forum"

  def get(id)  do
    redis_key = "#{@key_base}.#{id}"

    case Exredis.get(redis_key) do
      nil ->
        case refresh(id) do 
          nil -> {:ignore, nil}
          forum -> {:commit, forum}
        end
        refresh(id)
      raw ->
        {:commit, raw |> Forum.from_redis}
    end
  end

  def refresh(id)  do
    redis_key = "#{@key_base}.#{id}"

    Excache.del(redis_key)

    case Repo.get(Forum, id) do
      %Forum{} = forum ->
        Exredis.set(redis_key, Forum.to_redis(forum))
=======
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
>>>>>>> 0842e000362e27faba0424bbdedcfc8b16ed5c28
        forum
      _ -> nil
    end
  end

<<<<<<< HEAD
end
=======
  defp key(forum_id), do: "#{@key_base}.#{forum_id}" 

end
>>>>>>> 0842e000362e27faba0424bbdedcfc8b16ed5c28
