defmodule Acs.Search.ESForum do 
    require Elasticsearch
    alias Acs.Forums.ForumPost

    def index(%ForumPost{} = post, title, content) do
      Elasticsearch.index(%{
        index: "forum",
        type: "posts",
        doc: %{
          forum_id: post.forum_id,
          section_id: post.section_id,
          user_id: post.user_id,
          title: title,
          content: content,
          is_top: false,
          is_hot: false,
          is_vote: false,
          active: true,
          has_pic: post.has_pic,
          reads: 0,
          comms: 0,
          inserted_at: Timex.format!(post.inserted_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+00:00"),
          last_reply_at: Timex.format!(post.inserted_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+00:00"),
        },
        params: nil,
        id: post.id
      })
    end

end