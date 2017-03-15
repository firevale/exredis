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
    post "/get_user_info", ForumController, :get_user_info
    post "/get_user_paged_post", ForumController, :get_user_paged_post

    post "/add_post", ForumController, :add_post

    post  "/get_post_detail", ForumController, :get_post_detail
    post  "/get_post_comments", ForumController, :get_post_comments

    post "/delete_comment", ForumController, :delete_comment
    post "/add_comment", ForumController, :add_comment
    post "/toggle_post_favorite", ForumController, :toggle_post_favorite
    post "/toggle_post_status", ForumController, :toggle_post_status
    post "/search", ForumController, :search
  end

end
