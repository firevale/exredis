defmodule Acs.GamesRouter do
  use Acs.Web, :router
  use LogAlias

  import  Acs.Plugs

  pipeline :games do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :parse_user_agent
    plug :fetch_user_id
    plug :fetch_locale
    # plug :fetch_access_token
  end

  scope "/", Acs do
    pipe_through :games

    post  "/fetch_apps", GamesController, :fetch_apps
    post  "/get_paged_news", GamesController, :get_paged_news
    post  "/get_news_detail", GamesController, :get_news_detail
    post  "/get_top_news", GamesController, :get_top_news

  end

end
