defmodule Acs.GamesRouter do
  use Acs.Web, :router
  use LogAlias

  scope "/", Acs do
    pipe_through :games

    post  "/fetch_apps", GamesController, :fetch_apps
    post  "/get_paged_news", GamesController, :get_paged_news
    post  "/get_news_detail", GamesController, :get_news_detail
    post  "/get_top_news", GamesController, :get_top_news

    post  "/update_news", GamesController, :update_news
    post  "/get_paged_news_admin", GamesController, :get_paged_news_admin
    post  "/toggle_news_status", GamesController, :toggle_news_status
    post  "/update_news_title_picture", GamesController, :update_news_title_picture
    post  "/upload_news_pic", GamesController, :upload_news_pic

  end

end
