defmodule Acs.AdminRouter do
  use Acs.Web, :router

  import  Acs.Plugs

  pipeline :admin do 
    plug :accepts, ["json"]
    plug :fetch_session
    plug :fetch_user_id
    plug :fetch_locale
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
    post "/delete_app_goods", AdminController, :delete_app_goods
    post "/update_app_icon", AdminController, :update_app_icon
  end
end