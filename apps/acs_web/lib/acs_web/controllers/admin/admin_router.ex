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

    post "/list_admin_apps", AdminController, :list_admin_apps
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
      post "/list_admin_operate_logs", AdminController, :list_admin_operate_logs
    end

    scope "/mall" do
      pipe_through :admin_app

      post  "/update_mall_icon", MallController, :update_mall_icon
      post  "/update_mall", MallController, :update_mall
      post  "/update_goods_pic", MallController, :update_goods_pic
      post  "/update_goods_content_pic", MallController, :update_goods_content_pic
      post  "/update_mall_goods", MallController, :update_mall_goods
      post  "/delete_mall_goods", MallController, :delete_mall_goods
      post  "/toggle_mall_goods_status", MallController, :toggle_mall_goods_status
      post  "/refund_order", MallController, :refund_order
      post  "/set_mall_order_paid", MallController, :set_mall_order_paid
    end

    scope "/forum" do
      pipe_through :admin_app
      post "/update_forum_icon", ForumController, :update_forum_icon
      post "/update_forum", ForumController, :update_forum
      post "/update_forum_section", ForumController, :update_forum_section  
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
      post  "/get_user_info", UserController, :get_user_info

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
      post  "/list_my_codes", LoginCodesController, :list_my_codes 
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

      post  "/create_app_wcp_config", WcpController, :create_app_wcp_config
      post  "/update_app_wcp_config", WcpController, :update_app_wcp_config 
      post  "/list_wcp_user_messages", WcpController, :list_wcp_user_messages
      post  "/list_user_wcp_messages", WcpController, :list_user_wcp_messages
      post  "/reply_user_wcp_message", WcpController, :reply_user_wcp_message
      post  "/update_wcp_message_rule", WcpController, :update_wcp_message_rule
      post  "/delete_wcp_message_rule", WcpController, :delete_wcp_message_rule 
      post  "/list_wcp_message_rules", WcpController, :list_wcp_message_rules
      post  "/upload_wcp_image", WcpController, :upload_wcp_image
      post  "/upload_wcp_file", WcpController, :upload_wcp_file
      post  "/get_wcp_menu", WcpController, :get_wcp_menu
      post  "/update_wcp_menu", WcpController, :update_wcp_menu
    end

    scope "/pmall" do
      pipe_through :admin_app

      post  "/list_pmall_goods", PMallController, :list_pmall_goods
      post  "/update_pmall_goods", PMallController, :update_pmall_goods
      post  "/toggle_pmall_goods_status", PMallController, :toggle_pmall_goods_status
      post  "/delete_pmall_goods", PMallController, :delete_pmall_goods
      post  "/get_pmall_goods_detail", PMallController, :get_pmall_goods_detail
      post  "/list_pmall_point_logs", PMallController, :list_pmall_point_logs
      post  "/admin_add_pmall_point", PMallController, :admin_add_pmall_point
      post  "/update_goods_pic", PMallController, :update_goods_pic

      post "/get_task_list", PMallController, :get_task_list
      post "/update_task", PMallController, :update_task
      post "/delete_task", PMallController, :delete_task
      post "/toggle_task_status", PMallController, :toggle_task_status
      post "/upload_task_pic", PMallController, :upload_task_pic
      post "/change_taskbars_sort", PMallController, :change_taskbars_sort

      post  "/list_pmall_questions", PMallController, :list_pmall_questions
      post  "/update_pmall_question", PMallController, :update_pmall_question
      post  "/delete_pmall_question", PMallController, :delete_pmall_question

      post  "/list_pmall_draws", PMallController, :list_pmall_draws
      post  "/update_pmall_draw", PMallController, :update_pmall_draw
      post  "/delete_pmall_draw", PMallController, :delete_pmall_draw
    end

  end
end
