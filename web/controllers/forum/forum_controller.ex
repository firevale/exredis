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
    total = Repo.one!(from p in ForumPost, select: count(1), where: p.active == true )
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
                       "section_id" => section_id}) do



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
