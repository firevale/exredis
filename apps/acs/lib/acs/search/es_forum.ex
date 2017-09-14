defmodule Acs.Search.ESForum do 
    require Elasticsearch
    alias Acs.Forums.ForumPost

    def index(%ForumPost{} = post) do
      Elasticsearch.index(%{
        index: "forum",
        type: "posts",
        doc: %{
          forum_id: post.forum_id,
          section_id: post.section_id,
          user_id: post.user_id,
          title: post.title,
          content: post.content,
          is_top: post.is_top,
          is_hot: post.is_hot,
          is_vote: post.is_vote,
          active: post.active,
          has_pic: post.has_pic,
          reads: post.reads,
          comms: post.comms,
          inserted_at: Timex.format!(post.inserted_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+00:00"),
          last_reply_at: Timex.format!(post.last_reply_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+00:00"),
        },
        id: post.id
      })
    end

end