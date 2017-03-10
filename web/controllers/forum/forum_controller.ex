defmodule Acs.ForumController do
  use Acs.Web, :controller

  plug :fetch_app_id
  plug :fetch_user_id
  plug :fetch_user

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
    queryTotal = from p in ForumPost, select: count(1), where: p.forum_id == ^forum_id and p.active == true
    if(is_integer(section_id) and section_id>0) do
      queryTotal = queryTotal |> where([p], p.section_id == ^section_id)
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

    if(is_integer(section_id) and section_id>0) do
      query = query |> where([p], p.section_id == ^section_id)
    end
    posts = Repo.all(query)

    conn |> json(%{success: true, posts: posts, total: total_page})
  end
  def get_paged_post(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end

  # add_post
  def add_post(conn,%{"forum_id" => forum_id,
                       "title" => title,
                       "content" => content,
                       "section_id" => section_id} = post) do
      now_time = :calendar.local_time |> NaiveDateTime.from_erl!
      post = post |> Map.put("user_id", 100002) |> Map.put("created_at",now_time)

      case ForumPost.changeset(%ForumPost{},post) |>   Repo.insert do
        {:ok, post} ->
          conn |>json(%{success: true, message: "forum.newPost.addSuccess"})

        {:error, %{errors: errors}} ->
          d "errs: #{inspect errors, pretty: true}"
          conn |> json(%{success: false, message: "forum.error.networkError"})
      end
  end
  def add_post(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end

  # get_post_detail
  def get_post_detail(conn,%{"post_id" => post_id}) do
    query = from p in ForumPost,
            join: u in assoc(p, :user),
            join: s in assoc(p, :section),
            where: p.id == ^post_id,
            select: map(p, [:id, :title, :content, :created_at, user: [:id, :nickname, :avatar_url], section: [:id, :title]]),
            preload: [user: u, section: s]
    detail = Repo.one(query) |> Map.put(:rank,"楼主")

    conn |> json(%{success: true, detail: detail})
  end
  def get_post_detail(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end

  # get_post_commons
  def get_post_commons(conn,%{"post_id" => post_id,
                             "page" => page,
                             "records_per_page" => records_per_page}) do
    total = Repo.one!(from c in ForumComment, select: count(1), where: c.post_id == ^post_id)
    total_page = round(Float.ceil(total / records_per_page))

    query = from c in ForumComment,
            join: u in assoc(c, :user),
            order_by: [desc: c.id],
            where: c.post_id == ^post_id,
            select: map(c, [:id, :content, :created_at, user: [:id, :nickname, :avatar_url]]),
            limit: ^records_per_page,
            offset: ^((page - 1) * records_per_page),
            preload: [user: u]
    commons = Repo.all(query)

    conn |> json(%{success: true, commons: commons, total: total_page})
  end
  def get_post_commons(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end

  # delete_common
  def delete_common(%Plug.Conn{private: %{acs_user_id: user_id}} = conn,
                    %{"common_id" => common_id}) do
    #todo power check
    case Repo.get(ForumComment, common_id) do
      nil ->
        conn |> json(%{success: false,
                       i18n_message: "admin.serverError.commonNotFound"})

      %ForumComment{} = common ->
        case Repo.delete(common) do
          {:ok, _} ->
            conn |> json(%{success: true})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
    end
  end
  def delete_common(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end

  # toggle_post_favorite
  def toggle_post_favorite(%Plug.Conn{private: %{acs_user_id: user_id}} = conn,
                  %{"post_id" => post_id} = post) do
    favorite = Repo.one(from f in UserFavoritePost, select: f, where: f.post_id == ^post_id and f.user_id == ^user_id)
    case favorite do
      nil ->
        # add favorite
        now_time = :calendar.local_time |> NaiveDateTime.from_erl!
        post = post |> Map.put("user_id", user_id) |> Map.put("created_at",now_time)

        case UserFavoritePost.changeset(%UserFavoritePost{}, post) |> Repo.insert do
          {:ok, _} ->
            conn |> json(%{success: true, i18n_message: "forum.detail.collection"})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end

      %UserFavoritePost{} ->
        # delete favorite
        case Repo.delete(favorite) do
          {:ok, _} ->
            conn |> json(%{success: true, i18n_message: "forum.detail.cancelCollection"})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end

      _ ->
        conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})

    end
  end
  def toggle_post_favorite(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end

  # set post status
  def set_post_status(%Plug.Conn{private: %{acs_user_id: user_id}} = conn,
                  %{"post_id" => post_id,
                    "status" => status}) do
    # todo check power
    case Repo.get(ForumPost, post_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "forum.serverError.postNotExist"})

      %ForumPost{} = post ->
        case status do
          "close" -> post = post |> Map.put("active", true)

          "essence" -> post = post |> Map.put("is_vote", true)

          "up" -> post = post |> Map.put("is_top", true)

          _ -> conn |> json(%{success: false, i18n_message: "forum.serverError.postNotExist"})
        end
        case ForumPost.changeset(%ForumPost{}, post) |> Repo.update do
          {:ok, _} ->
            conn |>json(%{success: true, i18n_message: "forum.detail.operateSuccess"})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, i18n_message: "forum.error.networkError"})
        end

      _ ->
        conn |> json(%{success: false, i18n_message: "forum.serverError.postNotExist"})
    end
  end
  def set_post_status(conn, params) do
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

end
