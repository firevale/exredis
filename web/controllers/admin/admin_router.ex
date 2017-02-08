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
  end

end