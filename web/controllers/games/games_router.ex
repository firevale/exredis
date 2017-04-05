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

    post  "/get_paged_news", GamesController, :get_paged_news_admin
    post  "/get_news_detail", GamesController, :get_news_detail

  end

end
