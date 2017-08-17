defmodule Acs.Web.AdminController do
  use Acs.Web, :controller

  import  Acs.UploadImagePlugs
  alias   Acs.SdkInfoGenerator
  alias   Acs.RedisAdminUser

  def fetch_apps(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, _params) do
    admin_level = RedisAdminUser.get_admin_level(user_id)
    query =  from app in App,
            order_by: [desc: app.inserted_at],
            where: app.active == true,
            select: map(app, [:id, :name, :icon])
    query =
      if admin_level > 1  do
        appids = RedisAdminUser.get_admin_appids(user_id)
        where(query, [app], app.id in (^appids))
      else
        query
      end

    apps = Repo.all(query)
    conn |> json(%{success: true, apps: apps})
  end

  def fetch_app(conn, %{"app_id" => app_id}) do
    query = from app in App,
            left_join: sdk in assoc(app, :sdk_bindings),
            left_join: goods in assoc(app, :goods),
            left_join: product_ids in assoc(goods, :product_ids),
            order_by: [desc: app.inserted_at, asc: sdk.inserted_at, asc: goods.inserted_at],
            where: app.active == true and app.id == ^app_id,
            select: app,
            preload: [sdk_bindings: sdk, goods: {goods, product_ids: product_ids}]

    app = Repo.one(query)
    sdk_bindings = app.sdk_bindings |> Enum.map(fn(%{sdk: sdk} = x) ->
      binding = SdkInfoGenerator.generate_sdk_info(sdk) |> Map.merge(x.binding |> JSON.encode!() |> JSON.decode!(keys: :atoms))
      Map.put(x, :binding, binding)
    end)
    Map.put(app, :sdk_bindings, sdk_bindings)

    conn |> json(%{success: true, app: app})
  end

  @sdks Application.get_env(:acs, :sdks)
  def fetch_supported_sdks(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, _params) do
    admin_level = Repo.one(from au in AdminUser, where: au.user_id == ^user_id and au.admin_level > 0, select: min(au.admin_level)) || 0
    conn |> json(%{success: true, sdks: @sdks, admin_level: admin_level})
  end

  def update_app_info(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app" => %{"id" => app_id} = app_info}) do
    case Repo.get(App, app_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.appNotFound"})

      %App{} = app ->
        changed = App.changeset(app, app_info)
        {:ok, new_app} = changed |> Repo.update
        AdminController.add_operate_log(acs_admin_id, app_id, "update_app_info", changed.changes)
        _update_app_features(conn, new_app)
    end
  end
  def update_app_info(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app" => %{"name" => _app_name} = app_info}) do
    app_info = Map.put(app_info, "id", Utils.generate_token(16)) |> Map.put("secret", Utils.generate_token())
    case App.changeset(%App{}, app_info) |> Repo.insert do
      {:error, %{errors: errors}} ->
        conn |> json(%{success: false, message: translate_errors(errors)})

      {:ok, app} ->
        AdminController.add_operate_log(acs_admin_id, app.id, "update_app_info", app_info)
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
        RedisApp.refresh(app.id)
        conn |> json(%{success: true, 
          forum: forum |> Repo.preload(:sections), 
          app: app |> Repo.preload(goods: :product_ids) |> Repo.preload(:sdk_bindings)})

      nil ->
        RedisApp.refresh(app.id)
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
            RedisApp.refresh(app_id)
            RedisForum.refresh(new_forum.id)
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
              RedisForum.refresh(forum.id)
              RedisApp.refresh(app_id)
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
              RedisApp.refresh(new_goods.app_id)
              conn |> json(%{success: true, goods: new_goods |> Repo.preload(:product_ids)})

            {:error, %{errors: errors}} ->
              conn |> json(%{success: false, message: translate_errors(errors)})
          end

        %AppGoods{} = old_goods ->
          case AppGoods.changeset(old_goods, goods) |> Repo.update do
            {:ok, new_goods} ->
              RedisApp.refresh(new_goods.app_id)
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
        {:ok, icon_path} = Utils.deploy_image_file(from: image_file_path, to: "app_icons")
        App.changeset(app, %{icon: icon_path}) |> Repo.update!
        RedisApp.refresh(app_id)
        AdminController.add_operate_log(acs_admin_id, app_id, "update_app_icon", %{icon: icon_path})
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
        {:ok, image_path} = Utils.deploy_image_file(from: image_file_path, to: "goods_icons")
        AppGoods.changeset(goods, %{icon: image_path}) |> Repo.update!
        RedisApp.refresh(app_id)
        AdminController.add_operate_log(acs_admin_id, app_id, "update_goods_icon", %{icon: image_path})
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
            RedisApp.refresh(app_id)
            AdminController.add_operate_log(acs_admin_id, app_id, "delete_app_goods", %{"goods_id" => goods_id})
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
             RedisApp.refresh(app_id)
             AdminController.add_operate_log(acs_admin_id, app_id, "update_app_goods_product_id", params)
            conn |> json(%{success: true, product_id_info: new_product_id_info})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end

      %AppGoodsProductId{} = product_id_record ->
        changed = AppGoodsProductId.changeset(product_id_record, product_id_info)
        case changed |> Repo.update do
          {:ok, new_product_id_info} ->
             RedisApp.refresh(app_id)
             AdminController.add_operate_log(acs_admin_id, app_id, "update_app_goods_product_id", changed.changes)
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
    query = %{
      query: %{
        bool: %{
          must: [
            %{term: %{app_id: app_id}}
          ],
          should: [
            %{term: %{user_id: keyword}},
            %{term: %{goods_id: keyword}},
            %{term: %{device_id: keyword}},
            %{term: %{app_user_id: keyword}},
            %{term: %{sdk_user_id: keyword}},
            %{match: %{cp_order_id: keyword}},
            %{match: %{transaction_id: keyword}},
          ],
          minimum_should_match: 1,
          boost: 1.0,
        },
      },
      sort: %{inserted_at: %{order: :desc}},
      from: (page - 1) * records_per_page,
      size: records_per_page,
    }

    case Elasticsearch.search(%{index: "acs", type: "orders", query: query, params: %{timeout: "1m"}}) do
      {:ok, %{hits: %{hits: hits, total: total}}} ->
        ids = Enum.map(hits, &(&1._id))
        query = from order in AppOrder,
                  select: order,
                  where: order.id in ^ids,
                  order_by: [desc: order.inserted_at]

        orders = Repo.all(query)
        conn |> json(%{success: true, orders: orders, total: round(Float.ceil(total / records_per_page))})

      error ->
        error "search orders failed: #{inspect error, pretty: true}"
        conn |> json(%{success: false})
    end
  end

  def get_operate_log(conn, %{"app_id" => app_id, "user_id" => user_id, "page" => page, "records_per_page" => records_per_page}) do
    totalQuery = from ol in OperateLog, where: ol.app_id == ^app_id, select: count(ol.id)
    totalQuery = case String.length(user_id) do
      0 -> totalQuery
      _ -> where(totalQuery, [ol], ol.user_id == ^user_id)
    end
    total = Repo.one!(totalQuery)
    total_page = round(Float.ceil(total / records_per_page))

    query = from ol in OperateLog,
              join: u in assoc(ol, :user),
              select: map(ol, [:id, :operate_type, :log, :inserted_at, user: [:id, :email]]),
              limit: ^records_per_page,
              where: ol.app_id == ^app_id,
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

  def add_operate_log(%Plug.Conn{private: %{acs_session_user_id: user_id, acs_app_id: app_id}} = conn, %{"operate_type" => operate_type, "log" => log}) do
    case add_operate_log(user_id, app_id, operate_type, log) do
      :ok ->
        conn |> json(%{success: true})
      :error ->
        conn |> json(%{success: false})
    end

    log = log |> Map.put("user_id", user_id) |> Map.put("app_id", app_id)
    case OperateLog.changeset(%OperateLog{}, log) |> Repo.insert do
      {:ok, _new_log} ->
        conn |> json(%{success: true})

      {:error, %{errors: errors}} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
    end
  end

  def add_operate_log(user_id, app_id, operate_type, log) do
    params = %{user_id: user_id, app_id: app_id, operate_type: operate_type, log: log}
    case OperateLog.changeset(%OperateLog{}, params) |> Repo.insert do
      {:ok, _new_log} ->
        :ok
      {:error, %{errors: _errors}} ->
        d "--------------- add_operate_log fail:#{inspect _errors, pretty: true}"
        :error
    end
  end

end
