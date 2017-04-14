defmodule Acs.MallRouter do
  use Acs.Web, :router
  use LogAlias

  import  Acs.Plugs

  pipeline :mall do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :parse_user_agent
    plug :fetch_user_id
    plug :fetch_locale
    # plug :fetch_access_token
  end

  scope "/", Acs do
    pipe_through :mall

    get   "/fetch_malls", MallController, :fetch_malls
    post  "/update_mall_icon", MallController, :update_mall_icon
    post  "/update_mall_info", MallController, :update_mall_info
    post  "/fetch_goods", MallController, :fetch_goods
    post  "/update_goods_pic", MallController, :update_goods_pic
    post  "/update_goods_content_pic", MallController, :update_goods_content_pic
    post  "/update_goods", MallController, :update_goods
    post  "/delete_goods", MallController, :delete_goods

    get  "/get_mall_info", MallController, :get_mall_info
    post "/get_mall_info", MallController, :get_mall_info
    post "/get_active_goods_paged", MallController, :get_active_goods_paged
    
    post "/get_mall_detail", MallController, :get_mall_detail
    post "/get_goods_detail", MallController, :get_goods_detail

    post "fetch_order_list", MallOrderController, :fetch_order_list
    # get   "/get_paged_post", ForumController, :get_paged_post
    # post  "/get_paged_post", ForumController, :get_paged_postb
    # post  "/get_user_paged_post", ForumController, :get_user_paged_post
    # post  "/update_user_avatar", ForumController, :update_user_avatar

    # post  "/add_post", ForumController, :add_post

    # post  "/get_post_detail", ForumController, :get_post_detail
    # post  "/get_post_comments", ForumController, :get_post_comments
    # post  "/get_user_post_comments", ForumController, :get_user_post_comments

    # post  "/delete_comment", ForumController, :delete_comment
    # post  "/add_comment", ForumController, :add_comment
    # post  "/toggle_post_favorite", ForumController, :toggle_post_favorite
    # post  "/toggle_post_status", ForumController, :toggle_post_status
    # post  "/get_user_favorites", ForumController, :get_user_favorites
    # post  "/search", ForumController, :search

    # post  "/upload_post_image", ForumController, :upload_post_image
  end

end
