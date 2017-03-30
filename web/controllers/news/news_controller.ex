defmodule Acs.NewsController do
  use Acs.Web, :controller

  require Floki

  plug :cache_page, [cache_seconds: 600] when action in [:get_paged_news]

  # get_paged_news
  def get_paged_news(conn, %{"app_id" => app_id,
                          "group" => group,
                          "page" => page, 
                          "records_per_page" => records_per_page}) do
    total = Repo.one!(from n in AppNews, select: count(1), where: n.app_id == ^app_id and n.group == ^group)
    total_page = round(Float.ceil(total / records_per_page))

    query = from n in AppNews,
              where: n.app_id == ^app_id and n.group == ^group,
              order_by: [desc: n.id],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: map(n, [:id, :title, :is_top, :pic, :reads, :inserted_at])

    news = Repo.all(query)
    conn |> json(%{success: true, news: news, total: total_page, records: total})
  end
  def get_paged_news(conn, _) do
    conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
  end  
  
  # get_news_detail
  def get_news_detail(conn,%{"news_id" => news_id}) do
    query = from n in AppNews,
          join: u in assoc(n, :user),
          where: n.id == ^news_id,
          order_by: [desc: n.id],
          select: map(n, [:id, :title, :content, :is_top, :pic, :reads, :inserted_at,
                          user: [:id, :nickname, :avatar_url]]),
          preload: [user: u]

    news = Repo.one(query)

    add_news_click(news_id, 1)

    conn |> json(%{success: true, news: news})
  end
  def get_news_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
  end
  defp add_news_click(news_id, click) do
    news = Repo.get(AppNews, news_id)
    AppNews.changeset(news, %{reads: news.reads+click}) |> Repo.update()
  end

  # # add_post
  # def add_post(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, %{
  #               "forum_id" => forum_id,
  #               "title" => title,
  #               "content" => content,
  #               "section_id" => section_id} = post) do

  #     post = case Floki.find(content, "img") do
  #              [] -> post |> Map.put("user_id", user_id) |> Map.put("has_pic", true)
  #              _ -> post |> Map.put("user_id", user_id) |> Map.put("has_pic", true)
  #            end
      
  #     query = from f in Forum,
  #             join: s in assoc(f, :sections),
  #             where: f.id == ^forum_id and s.id == ^section_id,
  #             preload: [sections: s]

  #     with %Forum{} <- Repo.one(query),
  #           {:ok, new_post} <- ForumPost.changeset(%ForumPost{}, post) |> Repo.insert
  #     do
  #         Elasticsearch.index(%{
  #           index: "forum",
  #           type: "posts",
  #           doc: %{
  #             forum_id: forum_id,
  #             section_id: section_id,
  #             user_id: user_id,
  #             title: title,
  #             content: content,
  #             is_top: false,
  #             is_hot: false,
  #             is_vote: false,
  #             active: true,
  #             has_pic: post["has_pic"],
  #             reads: 0,
  #             comms: 0,
  #             inserted_at: Timex.format!(new_post.inserted_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+00:00"),
  #             last_reply_at: Timex.format!(new_post.inserted_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+00:00"),
  #           },
  #           params: nil,
  #           id: new_post.id
  #         })

  #         conn |>json(%{success: true, message: "forum.newPost.addSuccess"})
  #     else
  #       nil ->
  #           conn |> json(%{success: false, message: "forum.error.illegal"})
  #       {:error, %{errors: errors}} ->
  #         d "errs: #{inspect errors, pretty: true}"
  #         conn |> json(%{success: false, message: "forum.error.networkError"})
  #     end
  # end
  # def add_post(conn, _) do
  #   conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams", action: "login"})
  # end

  # # delete_comment
  # def delete_comment(%Plug.Conn{private: %{acs_session_user_id: user_id,
  #                                         acs_is_forum_admin: is_admin}} = conn,
  #                    %{"comment_id" => comment_id}) do
  #   case Repo.get(ForumComment, comment_id) do
  #     nil ->
  #       conn |> json(%{success: false, i18n_message: "forum.serverError.commentNotFound"})
  #     %ForumComment{} = comment ->
  #       if(!is_admin and comment.user_id != user_id) do
  #         conn |> json(%{success: false, i18n_message: "forum.error.illegal"})
  #       else
  #         with post_id = comment.post_id,
  #           {:ok, _} <- ForumComment.changeset(comment,
  #                                             %{active: false,
  #                                             content: "回复已被删除",
  #                                             editer_id: user_id }) |> Repo.update()
  #         do
  #           post = Repo.get(ForumPost, post_id)
  #           ForumPost.changeset(post, %{comms: post.comms-1}) |> Repo.update()

  #           conn |> json(%{success: true, i18n_message: "forum.detail.operateSuccess"})
  #         else
  #           {:error, %{errors: errors}} ->
  #             conn |> json(%{success: false, message: translate_errors(errors)})
  #           _ ->
  #             conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  #         end
  #       end
  #   end
  # end
  # def delete_comment(conn, _) do
  #   conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  # end

end
