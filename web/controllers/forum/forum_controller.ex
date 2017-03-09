defmodule Acs.ForumController do
  use Acs.Web, :controller

  plug :fetch_app_id
  plug :fetch_user_id
  plug :fetch_user

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

  def get_paged_post(conn, %{"section_id" => section_id,
                             "page" => page,
                             "records_per_page" => records_per_page,
                             "order" => order}) do
    queryTotal = from p in ForumPost, select: count(1), where: p.active == true
    if(is_integer(section_id) and section_id>0) do
      queryTotal = queryTotal |> where([p], p.section_id == ^section_id)
    end
    total = Repo.one!(queryTotal)
    total_page = round(Float.ceil(total / records_per_page))
    order = String.to_atom(order)

    query = from p in ForumPost,
              join: u in assoc(p, :user),
              join: s in assoc(p, :section),
              select: map(p, [:id, :title, :is_top, :is_hot, :is_vote, :reads, :comms, :created_at,
                        :last_reply_at, :has_pic, user: [:id, :nickname], section: [:id, :title]]),
             limit: ^records_per_page,
             where: p.active == true,
             offset: ^((page - 1) * records_per_page),
             preload: [user: u, section: s],
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

  def add_post(conn,%{"forum_id" => forum_id,
                       "title" => title,
                       "content" => content,
                       "section_id" => section_id} = post) do
      now_time = :calendar.local_time |> NaiveDateTime.from_erl!
      post = Map.put(post, "user_id", 100002)
      post=Map.put(post,"created_at",now_time)
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

  def getPostDetail(conn,%{"post_id" => post_id}) do

    

  end
  def getPostDetail(conn, params) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end

  defp get_forum_info_by_id(forum_id) do
    query = from forum in Forum,
            left_join: sections in assoc(forum, :sections),
            order_by: [desc: forum.id, desc: sections.sort],
            where: forum.id == ^forum_id,
            select: forum,
            preload: [sections: sections]
    Repo.one!(query)
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
