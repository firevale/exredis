defmodule Acs.AdminRouter do
  use Acs.Web, :router

  import  Acs.Plugs

  pipeline :admin do 
  end

  scope "/", Acs do
    pipe_through :admin

    get "/fetch_apps", AdminController, :fetch_apps
  end
end