defmodule Acs.ForumRouter do
  use Acs.Web, :router
  use LogAlias

  import  Acs.Plugs

  pipeline :forum do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :parse_user_agent
    plug :fetch_user_id
    plug :fetch_locale
    # plug :fetch_access_token
  end

  scope "/", Acs do
    pipe_through :forum

    get  "/get_forum_info", ForumController, :get_forum_info
    post "/get_forum_info", ForumController, :get_forum_info

    get  "/get_paged_post", ForumController, :get_paged_post
    post "/get_paged_post", ForumController, :get_paged_post
  end

end
