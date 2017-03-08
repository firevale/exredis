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
  def get_forum_info(%Plug.Conn{private: %{acs_app_id: app_id}} = conn,
                                                  params) do
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

  def get_paged_post(conn, %{"page" => page,
                             "records_per_page" => records_per_page,
                             "order" => order}) do
    total = Repo.one!(from post in ForumPost, select: count(post.id))
    total_page = round(Float.ceil(total / records_per_page))
    order = String.to_atom(order)

    query = from post in ForumPost,
              select: %{
                id: post.id,
                title: post.title,
                is_top: post.is_top,
                is_hot: post.is_hot,
                is_vote: post.is_vote,
                reads: post.reads,
                comms: post.comms,
                created_at: post.created_at,
                last_reply_at: post.last_reply_at,
                has_pic: post.has_pic},
              limit: ^records_per_page,
              where: post.active == true,
              offset: ^((page - 1) * records_per_page),
              order_by: [{:desc, post.is_top}, {:desc, ^order}]

    posts = Repo.all(query)

    conn |> json(%{success: true, posts: posts, total: total_page})
  end
  def get_paged_post(conn, params) do
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
