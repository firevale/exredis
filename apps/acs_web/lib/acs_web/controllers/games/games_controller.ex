defmodule AcsWeb.GamesController do
  use AcsWeb, :controller

  plug :fetch_access_token
  plug :fetch_session_user_id
  plug :cache_page, [cache_seconds: 600] when action in [:fetch_apps, :get_top_news, :get_paged_news, :get_news_detail]
  plug :check_is_admin when action in [:update_news, :toggle_news_status, :get_paged_news_admin, :update_news_pic]

  # fetch_apps
  def fetch_apps(conn, _params) do
    query = from app in App,
            order_by: [desc: app.inserted_at],
            where: app.active == true,
            select: map(app, [:id, :name, :icon])

    apps = Repo.all(query)

    conn |> json(%{success: true, apps: apps})
  end

  # get_top_news
  def get_top_news(conn, %{"app_id" => app_id,
                           "limit" => limit}) do
    query = from n in AppNews,
              where: n.app_id == ^app_id and n.group == "news" and n.active == true and n.is_top == true,
              order_by: [desc: n.id],
              limit: ^limit,
              select: map(n, [:id, :title, :content, :pic, :reads, :inserted_at])

    news = Repo.all(query)
    conn |> json(%{success: true, news: news})
  end
  def get_top_news(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # get_paged_news
  def get_paged_news(conn, %{"app_id" => app_id,
                             "group" => group,
                             "page" => page, 
                             "records_per_page" => records_per_page}) do
    total = Repo.one!(from n in AppNews, 
                      select: count(1), 
                      where: n.app_id == ^app_id and n.group == ^group and n.active == true)
    total_page = round(Float.ceil(total / records_per_page))

    fields = case group do 
              "notice" -> 
                [:id, :title, :content, :is_top, :active, :pic, :reads, :inserted_at]
              _ ->
                [:id, :title, :is_top, :active, :pic, :reads, :inserted_at]
             end

    query = from n in AppNews,
              where: n.app_id == ^app_id and n.group == ^group and n.active == true,
              order_by: [desc: n.id],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: map(n, ^fields)

    news = Repo.all(query)
    conn |> json(%{success: true, news: news, total: total_page, records: total})
  end
  def get_paged_news(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # get_news_detail
  def get_news_detail(conn,%{"news_id" => news_id}) do
    query = from n in AppNews,
          join: u in assoc(n, :user),
          where: n.id == ^news_id,
          order_by: [desc: n.id],
          select: map(n, [:id, :title, :content, :is_top, :active, :pic, :reads, :inserted_at,
                          user: [:id, :nickname, :avatar_url]]),
          preload: [user: u]

    news = Repo.one(query)

    add_news_click(news_id, 1)

    conn |> json(%{success: true, news: news})
  end
  def get_news_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  defp add_news_click(news_id, click) do
    news = Repo.get(AppNews, news_id)
    AppNews.changeset(news, %{reads: news.reads + click}) |> Repo.update()
  end

end
