defmodule Acs.Cache.CachedForum do
  require Exredis
  use     Utils.LogAlias

  alias   Acs.Repo
  import  Ecto.Query, warn: false

  alias   Acs.Forums.Forum

  @key_base   "acs.forum"

  def get(nil), do: nil
  def get(""), do: nil
  def get(forum_id) do
    Excache.get!(key(forum_id), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case _refresh(forum_id) do 
            nil -> {:ignore, nil}
            v -> {:commit, v}
          end

        raw ->
          {:commit, raw |> Forum.from_redis}
      end
    end)
  end

  def get_fat(nil), do: nil
  def get_fat(""), do: nil
  def get_fat(forum_id) do 
    Excache.get!(fat_key(forum_id), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case _refresh_fat(forum_id) do 
            nil -> {:ignore, nil}
            v -> {:commit, v}
          end

        raw ->
          {:commit, raw |> Forum.from_redis}
      end
    end)
  end

  def get_by(app_id: app_id) do 
    case Exredis.get(app_key(app_id)) do
      nil -> 
        query = 
          from forum in Forum,
            where: forum.app_id == ^app_id,
            select: forum.id
        
        case Repo.one(query) do 
          nil -> nil 
          forum_id ->
            Exredis.set(app_key(app_id), forum_id)
            get(forum_id)
        end

      forum_id ->
        get(forum_id)
    end
  end

  # v: 
  #   1. %Forum{}
  #   2. forum_id
  def refresh(v) do 
    _refresh(v)
    _refresh_fat(v)
  end

  def _refresh(forum_id)  do
    case Repo.get(Forum, forum_id) do
      %Forum{} = forum ->
        _refresh(forum)
        forum
      _ -> nil
    end
  end
  def _refresh(%Forum{id: forum_id, app_id: app_id} = forum) do 
    Exredis.set(key(forum_id), Forum.to_redis(forum))
    Excache.del(key(forum_id))
    Exredis.set(app_key(app_id), forum_id)
  end

  def _refresh_fat(%Forum{id: forum_id}), do: _refresh_fat(forum_id)
  def _refresh_fat(forum_id) do 
    query = 
      from forum in Forum,
        left_join: sections in assoc(forum, :sections),
        order_by: [desc: forum.id, desc: sections.sort],
        where: forum.id == ^forum_id,
        select: forum,
        preload: [sections: sections]

    case Repo.one(query) do 
      %Forum{app_id: app_id} = forum ->
        Exredis.set(fat_key(forum_id), Forum.to_redis(forum))
        Excache.del(fat_key(forum_id))
        Exredis.set(app_key(app_id), forum_id)

        forum
      _ -> 
        nil      
    end
  end

  def key(forum_id), do: "#{@key_base}.#{forum_id}"
  def fat_key(forum_id), do: "#{@key_base}.fat.#{forum_id}"
  def app_key(app_id), do: "#{@key_base}.app.#{app_id}"

end
