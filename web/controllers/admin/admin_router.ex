defmodule Acs.AdminRouter do
  use Acs.Web, :router
  use LogAlias
  pipeline :admin_super do
    plug :check_authorization, [admin_level: 1]
  end
  
  pipeline :admin_app do
    plug :check_authorization, [admin_level: 2]
  end
  
  pipeline :admin_customer_service do
    plug :check_authorization, [admin_level: 3]
  end

  scope "/", Acs do
    pipe_through :admin

    post "/fetch_apps", AdminController, :fetch_apps
    post "/fetch_app", AdminController, :fetch_app
    post "/fetch_supported_sdks", AdminController, :fetch_supported_sdks
    post "/update_app_info", AdminController, :update_app_info

    post "/generate_dummy_sdk_info", AppSdkInfoController, :generate_dummy_sdk_info
    post "/update_app_sdk_info", AppSdkInfoController, :update_app_sdk_info
    post "/update_goods_icon", AdminController, :update_goods_icon
    post "/update_app_goods_info", AdminController, :update_app_goods_info
    post "/update_app_goods_product_id", AdminController, :update_app_goods_product_id
    post "/delete_app_goods", AdminController, :delete_app_goods
    post "/update_app_icon", AdminController, :update_app_icon

    post "/fetch_orders", AdminController, :fetch_orders
    post "/search_orders", AdminController, :search_orders

    scope "/setting" do
      pipe_through :admin_super
      post  "/get_setting", AdminSettingController, :get_setting
      post  "/get_setting_from_redis", AdminSettingController, :get_setting_from_redis
      post  "/get_settings_by_group", AdminSettingController, :get_settings_by_group
      post  "/delete_setting", AdminSettingController, :delete_setting
      post  "/add_setting", AdminSettingController, :add_setting
      post  "/update_setting", AdminSettingController, :update_setting
      post  "/update_setting_by_name", AdminSettingController, :update_setting_by_name
    end

    scope "/mall" do
      pipe_through :admin_app
      post  "/update_mall_icon", MallController, :update_mall_icon
      post  "/update_mall_info", MallController, :update_mall_info

      post  "/update_goods_pic", MallController, :update_goods_pic
      post  "/update_goods_content_pic", MallController, :update_goods_content_pic
      post  "/update_goods", MallController, :update_goods
      post  "/delete_goods", MallController, :delete_goods
      post  "/toggle_goods_status", MallController, :toggle_goods_status

      post "/refund_order", MallOrderController, :refund_order
      post "/update_order_payed", MallOrderController, :update_order_payed
    end

    scope "/forum" do
      pipe_through :admin_app
      post "/update_forum_icon", ForumController, :update_forum_icon
      post "/update_forum_info", ForumController, :update_forum_info
      post "/update_section_info", ForumController, :update_section_info  
    end

    scope "/games" do
      pipe_through :admin_app
      post  "/update_news", GamesController, :update_news
      post  "/toggle_news_status", GamesController, :toggle_news_status
      post  "/get_paged_news_admin", GamesController, :get_paged_news_admin
      post  "/update_news_title_picture", GamesController, :update_news_title_picture
      post  "/upload_news_pic", GamesController, :upload_news_pic
    end

    scope "/user" do
      pipe_through :admin_app
      post  "/add_user", AdminUserController, :add_user
      post  "/get_users_by_app", AdminUserController, :get_users_by_app
    end
  end
end
