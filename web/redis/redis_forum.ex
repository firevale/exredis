defmodule Acs.RedisForum do
  require Redis

  alias   Acs.Repo
  import  Ecto.Query

  alias   Acs.Forum
  alias   Acs.ForumSection
  alias   Acs.RedisSetting
  alias   Acs.AdminSetting

  require Logger

  ########################################
  defstruct id: 0,
            title: nil,
            active: true,
            inserted_at: nil,
            active: nil,
            icon: "",
            sections: %{}

  use     Utils.Jsonable

  @forum_cache_key      "fvac.forum_cache"
  @forum_post_hot_key   "fvac.forum_post_hot"

  def find(id)  do
    redis_key = "#{@forum_cache_key}.#{id}"

    case Redis.get(redis_key) do
      :undefined ->
        refresh(id)
      raw ->
        raw |> from_json
    end
  end

  def refresh(id)  do
    redis_key = "#{@forum_cache_key}.#{id}"

    query = from forum in Forum,
              left_join: section in assoc(forum, :sections),
              where: forum.id == ^id,
              preload: [sections: section]

    case Repo.one(query) do
      nil -> nil
      %Forum{} = forum ->
        #Logger.debug "mysql app: #{inspect app, pretty: true}"

        cache = %__MODULE__{
          id: forum.id,
          title: forum.title,
          active: forum.active,
          inserted_at: forum.inserted_at,
          icon: forum.icon,
          sections: forum.sections
        }

        Redis.set(redis_key, to_json(cache))

        cache
    end
  end

  def checkIsHot(post_id, comments) do
    setting_key = "forum_post_hot_limit"
    case RedisSetting.find(setting_key) do
      nil -> :do_nothing

      setting ->
        limit = String.to_integer(setting)
        if(limit >0 and comments >= limit) do
          redis_key = "#{@forum_post_hot_key}.#{post_id}"
          case Redis.get(redis_key) do
            :undefined -> Redis.setex(redis_key, 12*3600, 1)
            _ -> :do_nothing
          end
        end
    end
  end

  def filterHotList(posts) do
    redis_keys = for n <- posts, do: @forum_post_hot_key <> "." <> Integer.to_string(n.id)
    exids = Redis.mget(redis_keys)

    {[], ps} = Enum.reduce(posts, {exids, []}, fn(post, {[x | exids], newPosts}) ->
        case x do
          "1" ->
            {exids, [%{post | is_hot: true} | newPosts]}
          _ ->
            {exids, [post | newPosts]}
        end
    end)  
    
    posts = Enum.reverse(ps)
  end

end
