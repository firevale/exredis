defmodule AcsWeb.GamesRouter do
  use AcsWeb, :router

  scope "/", AcsWeb do
    pipe_through :games

    post  "/list_thin_apps", GamesController, :list_thin_apps
    post  "/get_paged_news", GamesController, :get_paged_news
    post  "/get_news_detail", GamesController, :get_news_detail
    post  "/get_top_news", GamesController, :get_top_news
    
  end

end
