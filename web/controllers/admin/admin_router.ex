defmodule Acs.AdminRouter do
  use Acs.Web, :router

  import  Acs.Plugs

  pipeline :admin do 
  end

  scope "/", Acs do
    pipe_through :admin

    get  "/fetch_apps", AdminController, :fetch_apps
    post "/update_app_info", AdminController, :update_app_info
  end
end