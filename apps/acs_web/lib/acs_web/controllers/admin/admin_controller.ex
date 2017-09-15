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
          {:ok, new_app, %{changes: changes}} ->
            Admin.log_admin_operation(acs_admin_id, app_id, "update_app_info", changes)
            conn |> json(%{success: true, app: Apps.get_fat_app(app_id)})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end
    end
  end
  def update_app_info(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app" => %{"name" => _app_name} = app_info}) do
    app_info = Map.put(app_info, "id", Utils.generate_token(16)) |> Map.put("secret", Utils.generate_token())
    case App.changeset(%App{}, app_info) |> Repo.insert do
      {:error, %{errors: errors}} ->
        conn |> json(%{success: false, message: translate_errors(errors)})

      {:ok, app} ->
        Admin.log_admin_operation(acs_admin_id, app.id, "update_app_info", app_info)
        _update_app_features(conn, app)
    end
  end

  defp _update_app_features(conn, app) do 
    forum_name = case app.forum_name do 
      x when x in [nil, ""] -> app.name
      _ -> app.forum_name
    end

    _update_app_mall(app.has_mall, app.id, app.name)
    case _update_app_forum(app.has_forum, app.id, forum_name, app.forum_url) do
      {:ok, forum} ->
        CachedApp.refresh(app.id)
        conn |> json(%{success: true, 
          forum: forum |> Repo.preload(:sections), 
          app: app |> Repo.preload(goods: :product_ids) |> Repo.preload(:sdk_bindings)})

      nil ->
        CachedApp.refresh(app.id)
        conn |> json(%{success: true, app: app |> Repo.preload(goods: :product_ids) |> Repo.preload(:sdk_bindings)})

      {:error, %{errors: errors}}->
        conn |> json(%{success: false, message: translate_errors(errors)})
    end
  end

  defp _update_app_forum(has_forum, app_id, app_title, _forum_url) do
    case Repo.get_by(Forum, app_id: app_id) do
      %Forum{} = forum ->
        case Forum.changeset(forum, %{title: app_title, active: has_forum}) |> Repo.update do
          {:ok, new_forum} -> 
            CachedApp.refresh(app_id)
            CachedForum.refresh(new_forum.id)
            {:ok, new_forum}

          {:error, %{errors: errors}} ->
            {:error, errors}
        end

      nil -> 
        if has_forum do 
          case Forum.changeset(%Forum{}, %{title: app_title, active: has_forum, app_id: app_id}) |> Repo.insert do
            {:ok, forum} ->
              ForumSection.changeset(%ForumSection{}, %{title: "综合讨论", sort: 5, active: true, forum_id: forum.id}) |> Repo.insert
              ForumSection.changeset(%ForumSection{}, %{title: "攻略心得", sort: 4, active: true, forum_id: forum.id}) |> Repo.insert
              ForumSection.changeset(%ForumSection{}, %{title: "转帖分享", sort: 3, active: true, forum_id: forum.id}) |> Repo.insert
              ForumSection.changeset(%ForumSection{}, %{title: "玩家原创", sort: 2, active: true, forum_id: forum.id}) |> Repo.insert
              ForumSection.changeset(%ForumSection{}, %{title: "问题求助", sort: 1, active: true, forum_id: forum.id}) |> Repo.insert

              query = from f in Forum,
                      where: f.app_id == ^app_id,
                      preload: [:sections]
              result = Repo.one(query)
              CachedForum.refresh(forum.id)
              CachedApp.refresh(app_id)
              {:ok, result}

            {:error, %{errors: errors}} ->
              {:error,errors}
          end
        end
    end
  end

  defp _update_app_mall(has_mall, app_id, app_name) do
    case Repo.get_by(Mall, app_id: app_id) do
      nil ->
        if has_mall do
          Mall.changeset(%Mall{}, %{title: app_name, active: true, app_id: app_id}) |> Repo.insert
        end

      %Mall{} = mall ->
        Mall.changeset(mall, %{active: has_mall }) |> Repo.update 
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
    case Repo.get(App, app_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.appNotFound", i18n_message_object: %{app_id: app_id}})

      %App{} = app ->
        {:ok, icon_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "app_icons")
        App.changeset(app, %{icon: icon_path}) |> Repo.update!
        CachedApp.refresh(app_id)
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

  def get_operate_log(conn, %{"app_id" => app_id, "user_id" => user_id, "page" => page, "records_per_page" => records_per_page}) do
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
