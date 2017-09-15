defmodule AcsWeb.GamesController do
  use AcsWeb, :controller

  plug :fetch_access_token
  plug :fetch_session_user_id
  plug :cache_page, [cache_seconds: 600] when action in [:fetch_apps, :get_top_news, :get_paged_news, :get_news_detail]
  plug :check_is_admin when action in [:update_news, :toggle_news_status, :get_paged_news_admin, :update_news_pic]

  # fetch_apps
  def fetch_apps(conn, _params) do
    apps =  Apps.fetch_apps()
    conn |> json(%{success: true, apps: apps})
  end

  # get_top_news
  def get_top_news(conn, %{"app_id" => app_id, 
                          "limit" => limit}) do
    news = Apps.get_top_news(app_id, limit)
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
    {:ok, news, total_page, total} = Apps.get_paged_news(app_id, group, page, records_per_page)
    conn |> json(%{success: true, news: news, total: total_page, records: total})
  end
  def get_paged_news(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # get_news_detail
  def get_news_detail(conn,%{"news_id" => news_id}) do
    news = Apps.get_news_detail(news_id)
    Apps.add_news_click(news_id, 1)

    conn |> json(%{success: true, news: news})
  end
  def get_news_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

end
