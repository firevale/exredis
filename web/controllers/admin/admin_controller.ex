defmodule Acs.AdminController do
  use Acs.Web, :controller

  import  Acs.UploadImagePlugs
  require Mogrify
  alias   Acs.SdkInfoGenerator

  def fetch_apps(conn, params) do
    query = from app in App,
            left_join: sdk in assoc(app, :sdk_bindings),
            left_join: goods in assoc(app, :goods),
            left_join: product_ids in assoc(goods, :product_ids),
            order_by: [desc: app.inserted_at, asc: sdk.inserted_at, asc: goods.inserted_at],
            where: app.active == true,
            select: app,
            preload: [sdk_bindings: sdk, goods: {goods, product_ids: product_ids}]

    apps = Repo.all(query) |> Enum.map(fn(app) ->
      sdk_bindings = app.sdk_bindings |> Enum.map(fn(%{sdk: sdk} = x) ->
        binding = SdkInfoGenerator.generate_sdk_info(sdk) |> Map.merge(x.binding |> JSON.encode!() |> JSON.decode!(keys: :atoms))
        Map.put(x, :binding, binding)
      end)
      Map.put(app, :sdk_bindings, sdk_bindings)
    end)

    conn |> json(%{success: true, apps: apps})
  end

  @sdks Application.get_env(:acs, :sdks)
  def fetch_supported_sdks(conn, params) do
    conn |> json(%{success: true, sdks: @sdks})
  end

  def update_app_info(conn, %{"app" => %{"id" => app_id} = app_info}) do
    case Repo.get(App, app_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.appNotFound"})

      %App{} = app ->
        App.changeset(app, app_info) |> Repo.update!
        RedisApp.refresh(app_id)
        case update_app_forum(app_info["has_forum"],app_id,app_info["name"]) do
           {:ok, forum} ->
             d "req : #{inspect forum, pretty: true}"
             conn |> json(%{success: true, forum: forum, i18n_message: "admin.serverSuccess.appUpdated"})
          nil ->
             conn |> json(%{success: true, i18n_message: "admin.serverSuccess.appUpdated"})
           {:error, %{errors: errors}}->
             conn |> json(%{success: false, message: translate_errors(errors)})
        end
    end
  end
  def update_app_info(conn, %{"app" => %{"name" => app_name} = app_info}) do
    app_info = Map.put(app_info, "id", Utils.generate_token(16)) |> Map.put("secret", Utils.generate_token())
    case App.changeset(%App{}, app_info) |> Repo.insert do
      {:error, %{errors: errors}} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
      {:ok, app} ->
          RedisApp.refresh(app.id)
          case update_app_forum(app.has_forum, app.id, app.name) do
             {:ok, forum} ->
               d "req2 : #{inspect forum, pretty: true}"
               conn |> json(%{success: true, forum: forum, app: app |> Repo.preload(:goods) |> Repo.preload(:sdk_bindings)})
              nil ->
                conn |> json(%{success: true, app: app |> Repo.preload(:goods) |> Repo.preload(:sdk_bindings)})
              {:error, %{errors: errors}}->
                  conn |> json(%{success: false, message: translate_errors(errors)})
          end
    end
  end

  defp update_app_forum(has_forum, app_id, app_title) do
    unless has_forum do
      nil
    else
      forumRec=Repo.get_by(Forum, app_id: app_id)
      unless forumRec do
         case Forum.changeset(%Forum{}, %{title: app_title, active: true, app_id: app_id}) |> Repo.insert do
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
              {:ok, result}
            {:error, %{errors: errors}} ->
              {:error,errors}
         end
      end
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
      "price" => goods_price,
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
  def update_app_icon(conn, %{"app_id" => app_id, "file" => %{path: image_file_path}} = params) do
    case Repo.get(App, app_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.appNotFound", i18n_message_object: %{app_id: app_id}})

      %App{} = app ->
        relative_path = "/images/app_icons/"
        static_path = Application.app_dir(:acs, "priv/static/") 
        {:ok, dest_file_name} = Utils.cp_file_to_md5_name(image_file_path, Path.join(static_path, relative_path), "png")
        icon_url = static_url(conn, Path.join(relative_path, "/#{dest_file_name}"))
        App.changeset(app, %{icon: icon_url}) |> Repo.update!
        RedisApp.refresh(app_id)
        conn |> json(%{success: true, icon_url: icon_url})

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
  def update_goods_icon(conn, %{"app_id" => app_id, "goods_id" => goods_id, "file" => %{path: image_file_path}} = params) do
    case Repo.get(AppGoods, goods_id) do
      nil ->
        conn |> json(%{success: false,
                       i18n_message: "error.server.goodsNotFound",
                       i18n_message_object: %{goods_id: goods_id}})

      %AppGoods{app_id: ^app_id, icon: icon_url} = goods ->
        relative_path = "/images/goods_icons/"
        static_path = Application.app_dir(:acs, "priv/static/") 
        {:ok, dest_file_name} = Utils.cp_file_to_md5_name(image_file_path, Path.join(static_path, relative_path), "png")
        icon_url = static_url(conn, Path.join(relative_path, "/#{dest_file_name}"))
        AppGoods.changeset(goods, %{icon: icon_url}) |> Repo.update!
        RedisApp.refresh(app_id)
        conn |> json(%{success: true, icon_url: icon_url})
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end

  def delete_app_goods(conn, %{"goods_id" => ""}) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  def delete_app_goods(conn, %{"goods_id" => goods_id, "app_id" => app_id}) do
    case Repo.get(AppGoods, goods_id) do
      nil ->
        conn |> json(%{success: false,
                       i18n_message: "error.server.goodsNotFound",
                       i18n_message_object: %{goods_id: goods_id}})

      %AppGoods{app_id: ^app_id} = goods ->
        case Repo.delete(goods) do
          {:ok, _} ->
            RedisApp.refresh(app_id)
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
  def update_app_goods_product_id(conn, %{"product_id_info" => %{} = product_id_info, "app_id" => app_id}) do
    case Repo.get_by(AppGoodsProductId, app_goods_id: product_id_info["app_goods_id"], sdk: product_id_info["sdk"]) do
      nil ->
        case AppGoodsProductId.changeset(%AppGoodsProductId{}, product_id_info) |> Repo.insert do
          {:ok, new_product_id_info} ->
             RedisApp.refresh(app_id)
            conn |> json(%{success: true, product_id_info: new_product_id_info})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end

      %AppGoodsProductId{} = product_id_record ->
        case AppGoodsProductId.changeset(product_id_record, product_id_info) |> Repo.update do
          {:ok, new_product_id_info} ->
             RedisApp.refresh(app_id)
            conn |> json(%{success: true, product_id_info: new_product_id_info})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end
    end
  end

  def fetch_orders(conn, %{"page" => page, "records_per_page" => records_per_page}) do
    total = Repo.one!(from order in AppOrder, select: count(order.id))
    total_page = round(Float.ceil(total / records_per_page))

    query = from order in AppOrder,
              select: order,
              limit: ^records_per_page,
              where: order.status != 1,
              offset: ^((page - 1) * records_per_page),
              order_by: [desc: order.inserted_at]

    orders = Repo.all(query)

    conn |> json(%{success: true, orders: orders, total: total_page})
  end

  def search_orders(conn, %{"keyword" => keyword,
                            "page" => page,
                            "records_per_page" => records_per_page}) do
    query = %{
      query: %{
        bool: %{
          should: [
            %{term: %{app_id: keyword}},
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

end
