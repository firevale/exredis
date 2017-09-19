defmodule AcsWeb.ForumRouter do
  use AcsWeb, :router

  scope "/", AcsWeb do
    pipe_through :forum

    get   "/fetch_forums", ForumController, :fetch_forums
    post  "/get_app_forum", ForumController, :get_app_forum
    post  "/get_fat_forum", ForumController, :get_fat_forum
    get   "/get_forum_info", ForumController, :get_forum_info
    post  "/get_forum_info", ForumController, :get_forum_info
    post  "/get_paged_forums", ForumController, :get_paged_forums
    get   "/get_paged_post", ForumController, :get_paged_post
    post  "/get_paged_post", ForumController, :get_paged_post
    post  "/get_paged_ban_post", ForumController, :get_paged_ban_post
    post  "/add_post", ForumController, :add_post
    post  "/get_post_detail", ForumController, :get_post_detail
    post  "/get_post_comments", ForumController, :get_post_comments
    post  "/get_user_post_count", ForumController, :get_user_post_count
    post  "/get_user_paged_post", ForumController, :get_user_paged_post
    post  "/get_user_post_comments", ForumController, :get_user_post_comments
    post  "/delete_comment", ForumController, :delete_comment
    post  "/add_comment", ForumController, :add_comment
    post  "/toggle_post_favorite", ForumController, :toggle_post_favorite
    post  "/toggle_post_status", ForumController, :toggle_post_status
    post  "/get_user_favorites", ForumController, :get_user_favorites
    post  "/search", ForumController, :search
    post  "/upload_post_image", ForumController, :upload_post_image
    post  "/upload_comment_image", ForumController, :upload_comment_image
  end

end
