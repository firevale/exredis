defmodule Acs.AdminRouter do
  use Acs.Web, :router
  use LogAlias

  import  Acs.Plugs

  pipeline :admin do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :parse_user_agent
    plug :fetch_user_id
    plug :fetch_locale
    plug :fetch_access_token
    plug :check_admin_access
  end

  scope "/", Acs do
    pipe_through :admin

    get  "/fetch_apps", AdminController, :fetch_apps
    get  "/fetch_supported_sdks", AdminController, :fetch_supported_sdks
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

    get  "/fetch_forums", ForumController, :fetch_forums
    post "/update_forum_icon", ForumController, :update_forum_icon
    post "/update_forum_info", ForumController, :update_forum_info
    post "/update_section_info", ForumController, :update_section_info  

    post "/get_setting", AdminSettingController, :get_setting
    post "/get_setting_from_redis", AdminSettingController, :get_setting_from_redis
    post "/get_settings_by_group", AdminSettingController, :get_settings_by_group
    post "/delete_setting", AdminSettingController, :delete_setting
    post "/add_setting", AdminSettingController, :add_setting
    post "/update_setting", AdminSettingController, :update_setting
    post "/update_setting_by_name", AdminSettingController, :update_setting_by_name

    post  "/update_news", GamesController, :update_news
    post  "/get_paged_news_admin", GamesController, :get_paged_news_admin
    post  "/get_news_detail", GamesController, :get_news_detail
    post  "/toggle_news_status", GamesController, :toggle_news_status
    post  "/update_news_pic", GamesController, :update_news_pic

    get  "/fetch_malls", MallController, :fetch_malls
    post "/update_mall_icon", MallController, :update_mall_icon
    post "/update_mall_info", MallController, :update_mall_info
    
  end

end
