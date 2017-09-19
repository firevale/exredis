defmodule AcsWeb.Admin.AdminController do
  use AcsWeb, :controller

  require Exsdks
  alias   Acs.Admin
  alias   Acs.Apps

  def list_admin_apps(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, _params) do
    conn |> json(%{success: true, apps: Admin.list_admin_apps(user_id)})
  end

  def fetch_app(conn, %{"app_id" => app_id}) do
    conn |> json(%{success: true, app: Admin.get_app_info(app_id)})
  end

  @sdks Application.get_env(:acs, :sdks)
  def fetch_supported_sdks(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, _params) do
    conn |> json(%{success: true, sdks: @sdks, admin_level: AdminAuth.get_admin_level(user_id)})
  end

  def update_app_info(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app" => %{"id" => app_id} = app_info}) do
    case Apps.get_app(app_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.appNotFound"})

      %App{} = app ->
        case Apps.update_app(app, app_info) do 
          {:ok, _new_app, %{changes: changes}} ->
            if Enum.count(changes) > 0 do 
              Admin.log_admin_operation(acs_admin_id, app_id, "update_app_info", changes)
            end
            conn |> json(%{success: true, app: Apps.get_fat_app(app_id)})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end
    end
  end
  def update_app_info(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app" => %{"name" => _app_name} = app_info}) do
    app_id =  Utils.generate_token(16)
    app_info = Map.put(app_info, "id", app_id) |> Map.put("secret", Utils.generate_token())
    case Apps.create_app(app_info) do
      {:error, %{errors: errors}} ->
        conn |> json(%{success: false, message: translate_errors(errors)})

      {:ok, app} ->
        Admin.log_admin_operation(acs_admin_id, app.id, "create_app", app_info)
        conn |> json(%{success: true, app: Apps.get_fat_app(app_id)})
    end
  end

  def update_app_goods_info(conn, %{"goods" => %{"id" => ""}}) do
    conn |> json(%{success: false, i18n_message: "error.server.emptyGoodsId"})
  end
  def update_app_goods_info(conn, %{"goods" => %{"name" => ""}}) do
    conn |> json(%{success: false, i18n_message: "error.server.emptyGoodsName"})
  end
  def update_app_goods_info(conn, %{"goods" => %{"description" => ""}}) do
    conn |> json(%{success: false, i18n_message: "error.server.emptyGoodsDescription"})
  end
  def update_app_goods_info(conn, %{"goods" => %{"app_id" => ""}}) do
    conn |> json(%{success: false, i18n_message: "error.server.emptyGoodsAppId"})
  end
  def update_app_goods_info(conn, %{"goods" => %{
      "id" => goods_id,
      "name" => _,
      "description" => _,
      "price" => _goods_price,
      "app_id" => _,
    } = goods}) do
    if goods["price"] < 0 do
      conn |> json(%{success: false, i18n_message: "error.server.invalidGoodsPrice"})
    else
      case Repo.get(AppGoods, goods_id) do
        nil ->
          case AppGoods.changeset(%AppGoods{}, goods) |> Repo.insert do
            {:ok, new_goods} ->
              CachedApp.refresh(new_goods.app_id)
              conn |> json(%{success: true, goods: new_goods |> Repo.preload(:product_ids)})

            {:error, %{errors: errors}} ->
              conn |> json(%{success: false, message: translate_errors(errors)})
          end

        %AppGoods{} = old_goods ->
          case AppGoods.changeset(old_goods, goods) |> Repo.update do
            {:ok, new_goods} ->
              CachedApp.refresh(new_goods.app_id)
              conn |> json(%{success: true, goods: new_goods |> Repo.preload(:product_ids)})

            {:error, %{errors: errors}} ->
              conn |> json(%{success: false, message: translate_errors(errors)})
          end
      end
    end
  end

  plug :check_upload_image, [
    param_name: "file", 
    square: true,
    min_width: 128,
    format: "png",
    resize_to_limit: [width: 128, height: 128]] when action == :update_app_icon
  def update_app_icon(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app_id" => app_id, "file" => %{path: image_file_path}}) do
    case Apps.get_app(app_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.appNotFound", i18n_message_object: %{app_id: app_id}})

      %App{} = app ->
        {:ok, icon_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "app_icons")
        {:ok, _, _} = Apps.update_app(app, %{icon: icon_path})
        Admin.log_admin_operation(acs_admin_id, app_id, "update_app_icon", %{icon: icon_path})
        conn |> json(%{success: true, icon_url: icon_path})

      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end

  plug :check_upload_image, [
    param_name: "file", 
    square: true,
    min_width: 128,
    format: "png",
    resize_to_limit: [width: 128, height: 128]] when action == :update_goods_icon
  def update_goods_icon(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app_id" => app_id, "goods_id" => goods_id, "file" => %{path: image_file_path}}) do
    case Repo.get(AppGoods, goods_id) do
      nil ->
        conn |> json(%{success: false,
                       i18n_message: "error.server.goodsNotFound",
                       i18n_message_object: %{goods_id: goods_id}})

      %AppGoods{app_id: ^app_id, icon: _icon_url} = goods ->
        {:ok, image_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "goods_icons")
        AppGoods.changeset(goods, %{icon: image_path}) |> Repo.update!
        CachedApp.refresh(app_id)
        Admin.log_admin_operation(acs_admin_id, app_id, "update_goods_icon", %{icon: image_path})
        conn |> json(%{success: true, icon_url: image_path})
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end
  def update_goods_icon(conn, params) do 
    error "invalid request params for update_goods_icon: #{inspect params, pretty: true}"
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def delete_app_goods(conn, %{"goods_id" => ""}) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  def delete_app_goods(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"goods_id" => goods_id, "app_id" => app_id}) do
    case Repo.get(AppGoods, goods_id) do
      nil ->
        conn |> json(%{success: false,
                       i18n_message: "error.server.goodsNotFound",
                       i18n_message_object: %{goods_id: goods_id}})

      %AppGoods{app_id: ^app_id} = goods ->
        case Repo.delete(goods) do
          {:ok, _} ->
            CachedApp.refresh(app_id)
            Admin.log_admin_operation(acs_admin_id, app_id, "delete_app_goods", %{"goods_id" => goods_id})
            conn |> json(%{success: true})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end

  def update_app_goods_product_id(conn, %{"product_id_info" => %{"app_goods_id" => ""}}) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  def update_app_goods_product_id(conn, %{"product_id_info" => %{"product_id" => ""}}) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  def update_app_goods_product_id(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"product_id_info" => %{} = product_id_info, "app_id" => app_id} = params) do
    case Repo.get_by(AppGoodsProductId, app_goods_id: product_id_info["app_goods_id"], sdk: product_id_info["sdk"]) do
      nil ->
        case AppGoodsProductId.changeset(%AppGoodsProductId{}, product_id_info) |> Repo.insert do
          {:ok, new_product_id_info} ->
             CachedApp.refresh(app_id)
             Admin.log_admin_operation(acs_admin_id, app_id, "update_app_goods_product_id", params)
            conn |> json(%{success: true, product_id_info: new_product_id_info})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end

      %AppGoodsProductId{} = product_id_record ->
        changed = AppGoodsProductId.changeset(product_id_record, product_id_info)
        case changed |> Repo.update do
          {:ok, new_product_id_info} ->
             CachedApp.refresh(app_id)
             Admin.log_admin_operation(acs_admin_id, app_id, "update_app_goods_product_id", changed.changes)
            conn |> json(%{success: true, product_id_info: new_product_id_info})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end
    end
  end

  def fetch_orders(conn, %{"app_id" => app_id, "page" => page, "records_per_page" => records_per_page}) do
    total = Repo.one!(from order in AppOrder, where: order.app_id == ^app_id, select: count(order.id))
    total_page = round(Float.ceil(total / records_per_page))

    query = from order in AppOrder,
              select: order,
              limit: ^records_per_page,
              where: order.status != 1 and order.app_id == ^app_id,
              offset: ^((page - 1) * records_per_page),
              order_by: [desc: order.inserted_at]

    orders = Repo.all(query)

    conn |> json(%{success: true, orders: orders, total: total_page})
  end

  def search_orders(conn, %{"app_id" => app_id,
                            "keyword" => keyword,
                            "page" => page,
                            "records_per_page" => records_per_page}) do
    case Acs.Search.search_app_order(keyword: keyword, app_id: app_id, page: page, records_per_page: records_per_page) do 
      {:ok, total, orders}  ->
        conn |> json(%{success: true, orders: orders, total: round(Float.ceil(total / records_per_page))})

      {:error, _} ->
        conn |> json(%{success: false})
    end
  end

  def list_admin_operate_logs(conn, %{"app_id" => app_id, "user_id" => user_id, "page" => page, "records_per_page" => records_per_page}) do
    totalQuery = from ol in OpLog, where: ol.app_id == ^app_id, select: count(ol.id)
    totalQuery = case String.length(user_id) do
      0 -> totalQuery
      _ -> where(totalQuery, [ol], ol.user_id == ^user_id)
    end
    total = Repo.one!(totalQuery)
    total_page = round(Float.ceil(total / records_per_page))

    query = from ol in OpLog,
              join: u in assoc(ol, :user),
              select: map(ol, [:id, :operate_type, :log, :inserted_at, user: [:id, :email]]),
              where: ol.app_id == ^app_id,
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              order_by: [desc: ol.id],
              preload: [user: u]
    query = case String.length(user_id) do
      0 -> query
      _ -> where(query, [ol], ol.user_id == ^user_id)
    end
    logs = Repo.all(query)

    conn |> json(%{success: true, logs: logs, total: total_page})
  end

end
