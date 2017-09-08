defmodule Acs.Cache.CachedForumSection do
  require Exredis
  require Excache

  alias   Acs.Repo

  alias   Acs.Forums.ForumSection

  @key_base     "acs.forum_section"

  def get(forum_section_id) do
    Excache.get!(key(forum_section_id), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case refresh(forum_section_id) do 
            nil -> {:ignore, nil}
            forum_section -> {:commit, forum_section}
          end

        raw ->
          {:commit, raw |> ForumSection.from_redis}
      end
    end)
  end

  def refresh(forum_section_id) do
    redis_key = "#{@key_base}.#{forum_section_id}"

    case Repo.get(ForumSection, forum_section_id) do 
      %ForumSection{} = forum_section ->
        Exredis.set(key(forum_section_id), ForumSection.to_redis(forum_section))
        key(forum_section_id) |> Excache.del # force all nodes reload from redis
        forum_section
      _ -> nil
    end
  end

  defp key(forum_section_id), do: "#{@key_base}.#{forum_section_id}" 
end