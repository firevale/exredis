defmodule AcsWeb.AdminRouter do
  use AcsWeb, :router

  pipeline :admin_super do
    plug :check_admin_authorization, [admin_level: 1]
  end
  
  pipeline :admin_app do
    plug :check_admin_authorization, [admin_level: 2]
  end
  
  pipeline :admin_customer_service do
    plug :check_admin_authorization, [admin_level: 3]
  end

  scope "/", AcsWeb.Admin do
    pipe_through :admin

    post "/fetch_apps", AdminController, :fetch_apps
    post "/fetch_app", AdminController, :fetch_app
    post "/fetch_supported_sdks", AdminController, :fetch_supported_sdks
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

    scope "/app" do
      pipe_through :admin_app
      post "/update_app_sdk_info", AppSdkInfoController, :update_app_sdk_info
      post "/generate_dummy_sdk_info", AppSdkInfoController, :generate_dummy_sdk_info

      post "/update_app_icon", AdminController, :update_app_icon
      post "/update_app_info", AdminController, :update_app_info
      post "/update_goods_icon", AdminController, :update_goods_icon
      post "/update_app_goods_info", AdminController, :update_app_goods_info
      post "/update_app_goods_product_id", AdminController, :update_app_goods_product_id
      post "/delete_app_goods", AdminController, :delete_app_goods
    end

    scope "/log" do
      pipe_through :admin_app
      post "/get_operate_log", AdminController, :get_operate_log
      post "/add_operate_log", AdminController, :add_operate_log
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
      post  "/refund_order", MallController, :refund_order
      post  "/update_order_paid", MallController, :update_order_paid
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

    scope "/customer_service" do
      pipe_through :admin_customer_service
      post  "/update_question", CustomerServiceController, :update_question
      post  "/delete_question", CustomerServiceController, :delete_question
    end

    scope "/user" do
      pipe_through :admin_customer_service
      post  "/search_users", UserController, :search_users
      post  "/get_user_by_id", UserController, :get_user_by_id

      post  "/list_app_admin_users", AdminUserController, :list_app_admin_users
      post  "/delete_admin_user", AdminUserController, :delete_admin_user
      post  "/get_user_from_redis", AdminUserController, :get_user_from_redis
      post  "/search_user", AdminUserController, :search_user
      post  "/add_admin_user", AdminUserController, :add_admin_user
      post  "/get_current_user_level", AdminUserController, :get_current_user_level
    end

    scope "/login_codes" do 
      pipe_through :admin_app

      post  "/stats_info", LoginCodesController, :stats_info
      post  "/gen_codes", LoginCodesController, :gen_codes 
      post  "/del_codes", LoginCodesController, :del_codes 
      post  "/assign_codes", LoginCodesController, :assign_codes 
      post  "/fetch_my_codes", LoginCodesController, :fetch_my_codes 
    end

    scope "/stats" do 
      pipe_through :admin_customer_service

      post  "/onlines", StatsController, :onlines
      post  "/realtime_metrics", StatsController, :realtime_metrics
      post  "/historic_onlines", StatsController, :historic_onlines
      post  "/get_stats_by_date", StatsController, :get_stats_by_date
      post  "/get_user_timing_by_date", StatsController, :get_user_timing_by_date
      post  "/get_stats_retention", StatsController, :get_stats_retention
      post  "/get_stats_device", StatsController, :get_stats_device
      post  "/get_stats_device_details", StatsController, :get_stats_device_details
    end

    scope "/wcp" do 
      pipe_through :admin_customer_service

      post  "/add_wcp_empty_params", WcpController, :add_wcp_empty_params
      post  "/update_wcp_params", WcpController, :update_wcp_params 
      post  "/update_wcp_menus", WcpController, :update_wcp_menus 
      post  "/get_message_list", WcpController, :get_message_list
      post  "/get_user_message_list", WcpController, :get_user_message_list
      post  "/reply_user_message", WcpController, :reply_user_message
      post  "/delete_wcp_message", WcpController, :delete_wcp_message  
      post  "/update_wcp_message_rule", WcpController, :update_wcp_message_rule
      post  "/delete_wcp_message_rule", WcpController, :delete_wcp_message_rule 
      post  "/get_rule_list", WcpController, :get_rule_list
      post  "/upload_wcp_image", WcpController, :upload_wcp_image
      post  "/upload_wcp_file", WcpController, :upload_wcp_file
      post  "/get_wcp_menu", WcpController, :get_wcp_menu
      post  "/update_wcp_menu", WcpController, :update_wcp_menu
    end

    scope "/point" do
      pipe_through :admin_app
      post "/get_point_logs", PointController, :get_point_logs
      post "/admin_add_point", PointController, :admin_add_point
      
    end

    scope "/point_mall" do
      pipe_through :admin_app
      post  "/fetch_goods", PMallController, :fetch_goods
      post  "/update_goods", PMallController, :update_goods
      post  "/toggle_goods_status", PMallController, :toggle_goods_status
      post  "/delete_goods", PMallController, :delete_goods
      post  "/get_goods_detail", PMallController, :get_goods_detail
    end

  end
end
