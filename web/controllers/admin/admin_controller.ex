defmodule Acs.AdminController do
  use Acs.Web, :controller

  def fetch_apps(conn, params) do 
    query = from app in Acs.App,
            order_by: [desc: app.inserted_at],
            select: app 

    apps = Repo.all(query)

    conn |> json(%{success: true, apps: apps})
  end

end