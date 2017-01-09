defmodule Acs.AdminController do
  use Acs.Web, :controller

  def fetch_apps(conn, params) do 
    query = from app in App,
            left_join: sdk in assoc(app, :sdk_bindings),
            left_join: goods in assoc(app, :goods),
            left_join: product_ids in assoc(goods, :product_ids),
            order_by: [desc: app.inserted_at, asc: sdk.inserted_at, asc: goods.inserted_at],
            select: app,
            preload: [sdk_bindings: sdk, goods: {goods, product_ids: product_ids}]

    apps = Repo.all(query)

    conn |> json(%{success: true, apps: apps})
  end

  @sdks      Application.get_env(:acs, :sdks)
  def fetch_supported_sdks(conn, params) do 
    conn |> json(%{success: true, sdks: @sdks})
  end

  def update_app_info(conn, %{"app" => %{"id" => app_id} = app_info}) do 
    case Repo.get(App, app_id) do 
      nil -> 
        conn |> json(%{success: false, message: "admin.serverError.appNotFound"})
      %App{} = app ->
        App.changeset(app, app_info) |> Repo.update!
        conn |> json(%{success: true, message: "admin.serverSuccess.appUpdated"})
    end
  end

end