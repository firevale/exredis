defmodule Acs.AdminController do
  use Acs.Web, :controller

  require Mogrify
  require UFile

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

  def update_goods_icon(conn, %{"app_id" => app_id, "goods_id" => goods_id, "file" => %{} = upload_file} = params) do 
    case Repo.get(AppGoods, goods_id) do 
      nil ->
        conn |> json(%{success: false, message: "admin.serverError.goodsNotFound", message_object: %{goods_id: goods_id}})

      %AppGoods{app_id: ^app_id, icon: icon_url} = goods ->
        case Mogrify.open(upload_file.path) |> Mogrify.verbose do 
          %{width: 128, height: 128} = upload_image ->
            if upload_image.format == "png" do 
              {md5sum_result, 0} = System.cmd("md5sum", [upload_file.path])
              [file_md5 | _] = String.split(md5sum_result)
              file_key = "acs/appGoods/#{file_md5}.png"

              case URI.parse(icon_url || "") do
                %{path: ^file_key} ->
                  conn |> json(%{success: true, icon_url: icon_url})

                %{path: nil} ->
                  {:ok, url} = UFile.put_file(upload_file.path, file_key)
                  AppGoods.changeset(goods, %{icon: url}) |> Repo.update! 
                  conn |> json(%{success: true, icon_url: url})

                %{path: ""} ->
                  {:ok, url} = UFile.put_file(upload_file.path, file_key)
                  AppGoods.changeset(goods, %{icon: url}) |> Repo.update! 
                  conn |> json(%{success: true, icon_url: url})

                %{path: file_path} ->
                  {:ok, url} = UFile.put_file(upload_file.path, file_key)
                  {"/", old_file_key} = String.split_at(file_path, 1)
                  AppGoods.changeset(goods, %{icon: url}) |> Repo.update! 
                  :ok = UFile.delete_file(old_file_key)
                  conn |> json(%{success: true, icon_url: url})
              end
            else
              conn |> json(%{success: false, message: "admin.serverError.imageFormatPNG"})
            end
          _ ->
            conn |> json(%{success: false, message: "admin.serverError.imageSize128x128"}) 
        end
      _ -> 
        conn |> json(%{success: false, message: "admin.serverError.badRequestParams"})
    end
  end

end