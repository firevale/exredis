defmodule Acs.Cache.CachedForumHotPost do
  require Exredis
  use     Utils.LogAlias

  alias   Acs.Repo
  import  Ecto.Query

  alias   Acs.Cache.CachedAdminSetting

  @key_base   "acs.forum_hot_post"

  def is_hot?(post_id) do
    redis_key = "#{@key_base}.#{post_id}"
    case Exredis.get(redis_key) do
      nil -> false
      _ -> true
    end
  end

  def check(post_id, num_comments) do
    hot_limit = CachedAdminSetting.get("forum_post_hot_limit")
    hot_hours = CachedAdminSetting.get("forum_post_hot_hours")

    if hot_limit != nil and hot_hours != nil do
      hot_limit = String.to_integer(hot_limit)
      hot_hours = String.to_integer(hot_hours)
      if hot_limit > 0 and hot_hours > 0 do
        if num_comments >= hot_limit do
          redis_key = "#{@key_base}.#{post_id}"
          case Exredis.get(redis_key) do
            nil -> Exredis.setex(redis_key, hot_hours*3600, 1)
            _ -> :do_nothing
          end
        end
      end
    end
  end

  def filter_hot_posts(posts) do
    if posts != nil and length(posts) > 0 do
      redis_keys = for post <- posts do 
        @key_base <> "." <> Integer.to_string(post.id)
      end

      exids = Exredis.mget(redis_keys)

      {[], ps} = Enum.reduce(posts, {exids, []}, fn(post, {[x | exids], newPosts}) ->
        case x do
          "1" ->
            {exids, [%{post | is_hot: true} | newPosts]}
          _ ->
            {exids, [post | newPosts]}
        end
      end)
      
      Enum.reverse(ps)
    end
  end

end
