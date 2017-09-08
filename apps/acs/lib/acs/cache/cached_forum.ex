defmodule Acs.Cache.CachedForum do
  require Exredis
  use     Utils.LogAlias

  alias   Acs.Repo

  alias   Acs.Forums.Forum

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
        forum
      _ -> nil
    end
  end

end
