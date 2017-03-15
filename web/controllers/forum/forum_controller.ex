defmodule Acs.ForumController do
  use Acs.Web, :controller

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
              select: map(p, [:id, :title, :is_top, :is_hot, :is_vote, :reads, :comms, :created_at,
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
      with  %Forum{}=forum <-Repo.one(query),
            now_time <-:calendar.local_time |> NaiveDateTime.from_erl!,
            post <- post |> Map.put("user_id", user_id) |> Map.put("created_at",now_time),
            {:ok, post} <- ForumPost.changeset(%ForumPost{},post) |>   Repo.insert
      do
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
            select: map(p, [:id, :title, :content, :created_at, :active, :is_top, :is_hot, :is_vote, :reads,
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
  def get_post_comments(conn,%{"post_id" => post_id,
                             "page" => page,
                             "records_per_page" => records_per_page}) do
    total = Repo.one!(from c in ForumComment, select: count(1), where: c.post_id == ^post_id)
    total_page = round(Float.ceil(total / records_per_page))

    query = from c in ForumComment,
            join: u in assoc(c, :user),
            order_by: [asc: c.id],
            where: c.post_id == ^post_id,
            select: map(c, [:id, :content, :created_at, user: [:id, :nickname, :avatar_url]]),
            limit: ^records_per_page,
            offset: ^((page - 1) * records_per_page),
            preload: [user: u]
    comments = Repo.all(query)

    conn |> json(%{success: true, comments: comments, total: total_page, records: total})
  end
  def get_post_comments(conn, params) do
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
        post = post |> Map.put("user_id", user_id) |> Map.put("created_at",now_time)

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
                    %{"title" => title,
                      "content" => content,
                      "post_id" => post_id} = comment) do

      with  now_time <- :calendar.local_time |> NaiveDateTime.from_erl!,
            comment <- comment |> Map.put("user_id", user_id) |> Map.put("created_at", now_time),
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

end
