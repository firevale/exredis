defmodule Acs.ForumController do
  use Acs.Web, :controller

  alias   Acs.RedisForum

  plug :fetch_app_id
  plug :fetch_user_id
  plug :fetch_user
  plug :fetch_session_user_id

  # get_forum_info
  def get_forum_info(conn, %{"forum_id" => forum_id} = params) do
    case get_forum_info_by_id(forum_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "forum.serverError.forumNotExist"})
      %Forum{} = forum ->
        conn |> json(%{success: true, forum: forum})
    end
  end
  def get_forum_info(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, params) do
    case check_exist_by_appid(app_id) do
      {:ok, forum_id}  ->
        case get_forum_info_by_id(forum_id) do
          nil ->
            conn |> json(%{success: false, i18n_message: "forum.serverError.forumNotExist"})
          %Forum{} = forum ->
            conn |> json(%{success: true, forum: forum})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "forum.serverError.forumNotExist"})
    end
  end
  def get_forum_info(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end

  # get_paged_post
  def get_paged_post(conn, %{"forum_id" => forum_id,
                             "section_id" => section_id,
                             "page" => page,
                             "records_per_page" => records_per_page,
                             "order" => order}) do
    get_paged_post_list(conn, forum_id, section_id, page, records_per_page, order, 0)
  end
  def get_user_paged_post(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                            %{"forum_id" => forum_id,
                             "page" => page,
                             "records_per_page" => records_per_page}) do
    get_paged_post_list(conn, forum_id, 0, page, records_per_page, "id", user_id)
  end
  def get_user_paged_post(conn, _) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end
  def get_paged_post(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end
  defp get_paged_post_list(conn, forum_id, section_id, page, records_per_page, order, author_user_id) do

    queryTotal = from p in ForumPost, select: count(1), where: p.forum_id == ^forum_id and p.active == true

    queryTotal = if(is_integer(section_id) and section_id > 0) do
      queryTotal |> where([p], p.section_id == ^section_id)
    else
      queryTotal
    end
    queryTotal = if(is_integer(author_user_id) and author_user_id > 0) do
      queryTotal |> where([p], p.user_id == ^author_user_id)
    else
      queryTotal
    end

    total = Repo.one!(queryTotal)
    total_page = round(Float.ceil(total / records_per_page))
    order = String.to_atom(order)

    query = from p in ForumPost,
              join: u in assoc(p, :user),
              join: s in assoc(p, :section),
              join: f in assoc(p, :forum),
              select: map(p, [:id, :title, :is_top, :is_hot, :is_vote, :reads, :comms, :inserted_at,
                        :last_reply_at, :has_pic, user: [:id, :nickname], section: [:id, :title], forum: [:id]]),
             limit: ^records_per_page,
             where: p.forum_id == ^forum_id and p.active == true,
             offset: ^((page - 1) * records_per_page),
             preload: [user: u, section: s, forum: f],
             order_by: [{:desc, p.is_top}, {:desc, ^order}]

    query = if(is_integer(section_id) and section_id > 0) do
      query |> where([p], p.section_id == ^section_id)
    else
      query
    end
    query = if(is_integer(author_user_id) and author_user_id > 0) do
      query |> where([p], p.user_id == ^author_user_id)
    else
      query
    end
    posts = Repo.all(query)

    conn |> json(%{success: true, posts: posts, total: total_page, records: total})
  end

  # add_post
  def add_post(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, %{"forum_id" => forum_id,
                      "title" => title,
                      "content" => content,
                      "section_id" => section_id} = post) do
      query = from f in Forum,
              join: s in assoc(f, :sections),
              where: f.id==^forum_id and s.id==^section_id,
              preload: [sections: s]
      {:ok, post} = with  %Forum{}=forum <-Repo.one(query),
            post <- post |> Map.put("user_id", user_id),
            {:ok, post} <- ForumPost.changeset(%ForumPost{},post) |>   Repo.insert
      do
          Elasticsearch.index(%{
            index: "forum",
            type: "posts",
            doc: %{
              forum_id: forum_id,
              section_id: section_id,
              user_id: user_id,
              title: title,
              content: content,
              is_top: false,
              is_hot: false,
              is_vote: false,
              active: true,
              has_pic: false,
              reads: 0,
              comms: 0,
              inserted_at: Timex.format!(post.inserted_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+00:00"),
              last_reply_at: Timex.format!(post.inserted_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+00:00"),
            },
            params: nil,
            id: post.id
          })

          conn |>json(%{success: true, message: "forum.newPost.addSuccess"})
      else
        nil ->
            conn |> json(%{success: false, message: "forum.error.illegal"})
        {:error, %{errors: errors}} ->
          d "errs: #{inspect errors, pretty: true}"
          conn |> json(%{success: false, message: "forum.error.networkError"})
      end
  end
  def add_post(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams", action: "login"})
  end

  # get_post_detail
  def get_post_detail(conn,%{"post_id" => post_id}) do

    query = from p in ForumPost,
            join: u in assoc(p, :user),
            join: s in assoc(p, :section),
            where: p.id == ^post_id,
            select: map(p, [:id, :title, :content, :inserted_at, :active, :is_top, :is_hot, :is_vote, :reads,
                        user: [:id, :nickname, :avatar_url], section: [:id, :title]]),
            preload: [user: u, section: s]

    post = Repo.one(query)

    post = with user_id when is_integer(user_id) <- conn.private[:acs_session_user_id],
                 favorite = %UserFavoritePost{} <- Repo.one(from f in UserFavoritePost, select: f,
                 where: f.post_id == ^post_id and f.user_id == ^user_id)
    do
      Map.put(post, :is_favorite, true)
    else
      _ ->
        Map.put(post, :is_favorite, false)
    end

    add_post_count(post_id, %{reads: post.reads+1})

    conn |> json(%{success: true, detail: post})
  end
  def get_post_detail(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end

  # get_post_comments
  def get_post_comments(conn, %{"post_id" => post_id,
                              "page" => page,
                              "records_per_page" => records_per_page}) do
    total = Repo.one!(from c in ForumComment, select: count(1), where: c.post_id == ^post_id)
    total_page = round(Float.ceil(total / records_per_page))

    query = from c in ForumComment,
            join: u in assoc(c, :user),
            order_by: [asc: c.id],
            where: c.post_id == ^post_id,
            select: map(c, [:id, :content, :inserted_at, user: [:id, :nickname, :avatar_url]]),
            limit: ^records_per_page,
            offset: ^((page - 1) * records_per_page),
            preload: [user: u]

    comments = Repo.all(query)

    conn |> json(%{success: true, comments: comments, total: total_page, records: total})
  end
  def get_post_comments(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end

  # get_user_post_comments
  def get_user_post_comments(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                              %{"page" => page,
                              "records_per_page" => records_per_page}) do
    total = Repo.one!(from c in ForumComment, select: count(1), where: c.user_id == ^user_id)
    total_page = round(Float.ceil(total / records_per_page))

    query = from c in ForumComment,
            join: p in assoc(c, :post),
            join: s in assoc(p, :section),
            order_by: [desc: c.id],
            where: c.user_id == ^user_id,
            select: map(c, [:id, :content, :inserted_at, post: [:id, :title, :comms, :reads, section: [:id, :title]]]),
            limit: ^records_per_page,
            offset: ^((page - 1) * records_per_page),
            preload: [post: {p, section: s}]

    comments = Repo.all(query)

    conn |> json(%{success: true, comments: comments, total: total_page, records: total})
  end
  def get_user_post_comments(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end

  # delete_comment
  def delete_comment(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                    %{"comment_id" => comment_id}) do
    #todo power check
    with %ForumComment{} = comment <- Repo.get(ForumComment, comment_id),
      post_id = comment.post_id,
      {:ok, _} <- Repo.delete(comment)
    do
      add_post_comm_count(post_id, -1)
      conn |> json(%{success: true, i18n_message: "forum.detail.operateSuccess"})
    else
      nil ->
        conn |> json(%{success: false, i18n_message: "forum.serverError.commentNotFound"})
      {:error, %{errors: errors}} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
      _ ->
        conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
    end
  end
  def delete_comment(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end

  # toggle_post_favorite (need user login)
  def toggle_post_favorite(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                  %{"post_id" => post_id} = post) do
    favorite = Repo.one(from f in UserFavoritePost, select: f, where: f.post_id == ^post_id and f.user_id == ^user_id)
    case favorite do
      nil ->
        # add favorite
        now_time = :calendar.local_time |> NaiveDateTime.from_erl!
        post = Map.put(post, "user_id", user_id)

        case UserFavoritePost.changeset(%UserFavoritePost{}, post) |> Repo.insert do
          {:ok, _} ->
            conn |> json(%{success: true, i18n_message: "forum.detail.operateSuccess"})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end

      %UserFavoritePost{} ->
        # delete favorite
        case Repo.delete(favorite) do
          {:ok, _} ->
            conn |> json(%{success: true, i18n_message: "forum.detail.operateSuccess"})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end

      _ ->
        conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})

    end
  end
  def toggle_post_favorite(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams", action: "login"})
  end

  # toggle post status
  def toggle_post_status(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                  %{"post_id" => post_id} = params) do
    # todo check power
    with %ForumPost{} = post <- Repo.get(ForumPost, post_id),
         {:ok, _} <- ForumPost.changeset(post, params) |> Repo.update()
    do
      conn |> json(%{success: true, i18n_message: "forum.detail.operateSuccess"})
    else
      {:error, %{errors: errors}} ->
        conn |> json(%{success: false, i18n_message: "forum.error.networkError"})
      _ ->
        conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
    end
  end
  def toggle_post_status(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end

  # add_comment
  def add_comment(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                    %{"content" => content,
                      "post_id" => post_id} = comment) do

      with  now_time <- :calendar.local_time |> NaiveDateTime.from_erl!,
            comment <- comment |> Map.put("user_id", user_id),
            {:ok, comment} <- ForumComment.changeset(%ForumComment{}, comment) |> Repo.insert
      do
        add_post_comm_count(post_id, 1)
        conn |>json(%{success: true, i18n_message: "forum.writeComment.addSuccess"})
      else
        nil ->
          conn |> json(%{success: false, i18n_message: "forum.error.illegal"})
        {:error, %{errors: errors}} ->
          conn |> json(%{success: false, i18n_message: "forum.error.networkError"})
      end
  end
  def add_comment(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams", action: "login"})
  end

  # get_user_info
  def get_user_info(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, params) do
    query = from u in User,
            where: u.id == ^user_id,
            select: map(u, [:id, :nickname, :avatar_url, :inserted_at])

    case Repo.one(query) do
      nil ->
        conn |> json(%{success: false, i18n_message: "forum.serverError.userNotExist"})
      _ = user ->
        conn |> json(%{success: true, user: user})
    end

  end
  def get_user_info(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end

  # get_user_favorites
  def get_user_favorites(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                                    %{"page" => page,
                                    "records_per_page" => records_per_page}) do
    queryTotal = from f in UserFavoritePost, select: count(1), where: f.user_id == ^user_id
    total = Repo.one!(queryTotal)
    total_page = round(Float.ceil(total / records_per_page))

    query = from f in UserFavoritePost,
            join: p in assoc(f, :post),
            join: s in assoc(p, :section),
            select: map(f, [:id, post: [:id, :inserted_at, :title, :comms, :reads, section: [:id, :title]]]),
            limit: ^records_per_page,
            where: f.user_id == ^user_id,
            offset: ^((page - 1) * records_per_page),
            preload: [post: {p, section: s}],
            order_by: [{:desc, f.id}]
    favorites = Repo.all(query)

    conn |> json(%{success: true, favorites: favorites, total: total_page, records: total})
  end
  def get_user_favorites(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end

  defp get_forum_info_by_id(forum_id) do
    query = from f in Forum,
            left_join: s in assoc(f, :sections),
            order_by: [desc: f.id, desc: s.sort],
            where: f.id == ^forum_id,
            select: f,
            preload: [sections: s]
    Repo.one(query)
  end

  defp check_exist_by_appid(app_id) do
    case Repo.get_by(Forum, app_id: app_id) do
      nil ->
        {:error, i18n_message: "forum.serverError.forumNotExist"}
      %Forum{} = forum ->
        {:ok, forum.id}
    end
  end

  defp add_post_count(post_id, params) do
    post = Repo.get(ForumPost, post_id)
    ForumPost.changeset(post, params) |> Repo.update()
  end

  defp add_post_comm_count(post_id, count) do
    post = Repo.get(ForumPost, post_id)
    ForumPost.changeset(post, %{comms: post.comms+count}) |> Repo.update()
  end

 def search(conn, %{"forum_id" => forum_id,"keyword" => keyword,
                           "page" => page,"records_per_page" => records_per_page}) do
  query = %{
    query: %{
      multi_match: %{
        query: keyword,
        fields: [:title, :content],
      }
    }
  }

  case Elasticsearch.search(%{index: "forum", type: "posts", query: query, params: %{timeout: "1m"}}) do
    {:ok, %{hits: %{hits: hits, total: total}}} ->


      postList = Enum.map(hits, fn(hit) ->
         user_id = hit._source.user_id
         userRaw = RedisUser.find(user_id)
         user=if userRaw do
                Map.take(userRaw, [:id, :nickname, :avatar_url, :inserted_at])
              end

         forumId=hit._source.forum_id
         forum = case Process.get("forum_#{forumId}") do
                   nil ->
                     forumNew = RedisForum.find(hit._source.forum_id)
                     Process.put("forum_#{forumId}", forumNew)
                     forumNew
                   forumCache ->
                     forumCache
                  end

          section_id=hit._source.section_id
          section = if forum && forum.sections && section_id  do
                      forum.sections
                      |> Enum.find(fn(item) -> item.id==section_id  end)
                    end

           %{
            id: hit._id,
            forum_id: forumId,
            forum:  forum,
            user_id: user_id,
            user: user,
            section_id: hit._source.section_id,
            section: section,
            title: hit._source.title,
            content: hit._source.content,
            is_top: hit._source.is_top,
            is_hot: hit._source.is_hot,
            is_vote: hit._source.is_vote,
            reads: hit._source.reads,
            comms: hit._source.comms,
            inserted_at: hit._source.inserted_at,
            active: hit._source.active,
            has_pic: hit._source.has_pic
          }

          end)
      total_page=round(Float.ceil(total/records_per_page))
      conn |> json(%{success: true, postList: postList, total: total_page})

    error ->
      error "search failed: #{inspect error, pretty: true}"
      conn |> json(%{success: false})
  end
 end

end
