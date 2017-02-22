defmodule Acs.AdminController do
  use Acs.Web, :controller

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
        conn |> json(%{success: false, i18n_message: "admin.serverError.appNotFound"})

      %App{} = app ->
        App.changeset(app, app_info) |> Repo.update!
        RedisApp.refresh(app_id)
        conn |> json(%{success: true, i18n_message: "admin.serverSuccess.appUpdated"})
    end
  end
  def update_app_info(conn, %{"app" => %{"name" => app_name} = app_info}) do 
    app_info = Map.put(app_info, "id", Utils.generate_token(16)) |> Map.put("secret", Utils.generate_token())
    case App.changeset(%App{}, app_info) |> Repo.insert do 
      {:ok, app} -> 
        RedisApp.refresh(app.id)
        conn |> json(%{success: true, app: app |> Repo.preload(:goods) |> Repo.preload(:sdk_bindings)})

      {:error, %{errors: errors}} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
    end
  end

  def update_app_goods_info(conn, %{"goods" => %{"id" => ""}}) do 
    conn |> json(%{success: false, i18n_message: "admin.serverError.emptyGoodsId"})
  end
  def update_app_goods_info(conn, %{"goods" => %{"name" => ""}}) do 
    conn |> json(%{success: false, i18n_message: "admin.serverError.emptyGoodsName"})
  end
  def update_app_goods_info(conn, %{"goods" => %{"description" => ""}}) do 
    conn |> json(%{success: false, i18n_message: "admin.serverError.emptyGoodsDescription"})
  end
  def update_app_goods_info(conn, %{"goods" => %{"app_id" => ""}}) do 
    conn |> json(%{success: false, i18n_message: "admin.serverError.emptyGoodsAppId"})
  end
  def update_app_goods_info(conn, %{"goods" => %{
      "id" => goods_id,
      "name" => _,
      "description" => _,
      "price" => goods_price,
      "app_id" => _,
    } = goods}) do 
    if goods["price"] < 0 do 
      conn |> json(%{success: false, i18n_message: "admin.serverError.invalidGoodsPrice"})
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

  def update_app_icon(conn, %{"app_id" => app_id, "file" => %{} = upload_file} = params) do 
    case Repo.get(App, app_id) do 
      nil ->
        conn |> json(%{success: false, i18n_message: "admin.serverError.appNotFound", i18n_message_object: %{app_id: app_id}})

      %App{} = app ->
        case Mogrify.open(upload_file.path) |> Mogrify.verbose do 
          %{width: 128, height: 128} = upload_image ->
            if upload_image.format == "png" do 
              {md5sum_result, 0} = System.cmd("md5sum", [upload_file.path])
              [file_md5 | _] = String.split(md5sum_result)
              static_path = Application.app_dir(:acs, "priv/static/")
              url_path = "/images/app_icons/"
              {_, 0} = System.cmd("mkdir", ["-p", Path.join(static_path, url_path)])
              {_, 0} = System.cmd("cp", ["-f", upload_file.path, Path.join(static_path, Path.join(url_path, "/#{file_md5}.png"))])
              icon_url = static_url(conn, Path.join(url_path, "/#{file_md5}.png"))
              d "icon_url: #{icon_url}"
              App.changeset(app, %{icon: icon_url}) |> Repo.update!
              RedisApp.refresh(app_id)
              conn |> json(%{success: true, icon_url: icon_url})
            else
              conn |> json(%{success: false, i18n_message: "admin.serverError.imageFormatPNG"})
            end
          _ ->
            conn |> json(%{success: false, i18n_message: "admin.serverError.imageSize128x128"}) 
        end
      _ -> 
        conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
    end
  end

  def update_goods_icon(conn, %{"app_id" => app_id, "goods_id" => goods_id, "file" => %{} = upload_file} = params) do 
    case Repo.get(AppGoods, goods_id) do 
      nil ->
        conn |> json(%{success: false, 
                       i18n_message: "admin.serverError.goodsNotFound", 
                       i18n_message_object: %{goods_id: goods_id}})

      %AppGoods{app_id: ^app_id, icon: icon_url} = goods ->
        case Mogrify.open(upload_file.path) |> Mogrify.verbose do 
          %{width: 128, height: 128} = upload_image ->
            if upload_image.format == "png" do 
              {md5sum_result, 0} = System.cmd("md5sum", [upload_file.path])
              [file_md5 | _] = String.split(md5sum_result)
              static_path = Application.app_dir(:acs, "priv/static/")
              url_path = "/images/goods_icons/"
              {_, 0} = System.cmd("mkdir", ["-p", Path.join(static_path, url_path)])
              {_, 0} = System.cmd("cp", ["-f", upload_file.path, Path.join(static_path, Path.join(url_path, "/#{file_md5}.png"))])
              icon_url = static_url(conn, Path.join(url_path, "/#{file_md5}.png"))
              d "icon_url: #{icon_url}"
              AppGoods.changeset(goods, %{icon: icon_url}) |> Repo.update! 
              RedisApp.refresh(app_id)
              conn |> json(%{success: true, icon_url: icon_url})
            else
              conn |> json(%{success: false, i18n_message: "admin.serverError.imageFormatPNG"})
            end
          _ ->
            conn |> json(%{success: false, i18n_message: "admin.serverError.imageSize128x128"}) 
        end
      _ -> 
        conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
    end
  end

  def delete_app_goods(conn, %{"goods_id" => ""}) do 
    conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
  end
  def delete_app_goods(conn, %{"goods_id" => goods_id, "app_id" => app_id}) do 
    case Repo.get(AppGoods, goods_id) do 
      nil ->
        conn |> json(%{success: false, 
                       i18n_message: "admin.serverError.goodsNotFound", 
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
        conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
    end
  end

  def update_app_goods_product_id(conn, %{"product_id_info" => %{"app_goods_id" => ""}}) do 
    conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
  end
  def update_app_goods_product_id(conn, %{"product_id_info" => %{"product_id" => ""}}) do 
    conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
  end
  def update_app_goods_product_id(conn, %{"product_id_info" => %{} = product_id_info}) do 
    case Repo.get_by(AppGoodsProductId, app_goods_id: product_id_info["app_goods_id"], sdk: product_id_info["sdk"]) do 
      nil ->
        case AppGoodsProductId.changeset(%AppGoodsProductId{}, product_id_info) |> Repo.insert do 
          {:ok, new_product_id_info} ->
            conn |> json(%{success: true, product_id_info: new_product_id_info})
          
          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end                

      %AppGoodsProductId{} = product_id_record ->
        case AppGoodsProductId.changeset(product_id_record, product_id_info) |> Repo.update do 
          {:ok, new_product_id_info} ->
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
              order_by: [desc: order.created_at]

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
      sort: %{created_at: %{order: :desc}},
      from: (page - 1) * records_per_page,
      size: records_per_page,
    } 

    case Elasticsearch.search(%{index: "acs", type: "orders", query: query, params: %{timeout: "1m"}}) do 
      {:ok, %{hits: %{hits: hits, total: total}}} ->
        ids = Enum.map(hits, &(&1._id))
        query = from order in AppOrder,
                  select: order,
                  where: order.id in ^ids, 
                  order_by: [desc: order.created_at]
        
        orders = Repo.all(query)
        conn |> json(%{success: true, orders: orders, total: round(Float.ceil(total / records_per_page))})

      error -> 
        error "search orders failed: #{inspect error, pretty: true}"
        conn |> json(%{success: false})
    end
  end

end