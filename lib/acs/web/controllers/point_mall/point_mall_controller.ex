defmodule Acs.Web.PointMallController do
  use Acs.Web, :controller

  alias   Acs.RedisPointMall
  alias   Acs.RedisApp
  import  Acs.UploadImagePlugs
  require Floki

  plug :fetch_app_id
  plug :fetch_access_token
  plug :fetch_session_user_id
  plug :fetch_session_user
  plug :cache_page, [cache_seconds: 10] when action in [:fetch_malls, :get_active_goods_paged]
  plug :check_is_admin when action in [:update_goods, :update_goods_pic, :toggle_goods_status, :delete_goods]

  # fetch_goods
  def fetch_goods(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"page" => page, "records_per_page" => records_per_page,
   "keyword" => keyword}) do

    {:ok,searchTotal,ids} =search_goods(app_id, keyword,page,records_per_page)

    queryTotal = from g in PointMallGoods, select: count(1), where: g.app_id == ^app_id
    total = if String.length(keyword)>0 , do: searchTotal, else: Repo.one!(queryTotal)

    if total == 0 do
      conn |> json(%{success: true, total: 0, goodses: []})
    else
        total_page = round(Float.ceil(total / records_per_page))
        query = from g in PointMallGoods,
              where: g.app_id == ^app_id,
              order_by: [desc: g.inserted_at],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: map(g, [:id, :name, :currency, :pic, :price, :postage, :stock, :sold, :active])

        query = if(String.length(keyword)>0) do
          query |> where([p], p.id in ^ids)
        else
          query
        end

         goodses = Repo.all(query)
         conn |> json(%{success: true, goodses: goodses, total: total_page})
    end
  end
  def fetch_goods(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  defp search_goods(_app_id, keyword, page, records_per_page) do
    if String.length(keyword)>0 do
          query = %{
            query: %{
              bool: %{
                should: [
                  %{term: %{id: keyword}},
                  %{term: %{app_id: keyword}},
                  %{match: %{name: keyword}},
                  %{match: %{description: keyword}},
                ],
                minimum_should_match: 1,
                boost: 1.0,
              },
            },
            sort: %{inserted_at: %{order: :desc}},
            from: (page - 1) * records_per_page,
            size: records_per_page,
          }

          case Elasticsearch.search(%{index: "pointMall", type: "goods", query: query, params: %{timeout: "1m"}}) do
            {:ok, %{hits: %{hits: hits, total: total}}} ->
              ids = Enum.map(hits, &(&1._id))
              {:ok, total, ids }
            error ->
             throw(error)
          end
        else
          {:ok,0, {}}
        end
  end

  # update_goods_pic
  plug :check_upload_image, [
    param_name: "file", 
    square: true,
    format: ["png", "jpeg", "jpg"],
    reformat: "jpg"] when action == :update_goods_pic
  def update_goods_pic(%Plug.Conn{private: %{acs_admin_id: acs_admin_id, acs_app_id: app_id}} = conn, 
                      %{"goods_id" => goods_id, "file" => %{path: image_file_path}}) do
   case Repo.get(PointMallGoods, goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound", i18n_message_object: %{goods_id: goods_id}})

      %PointMallGoods{} = goods ->
        {:ok, image_path} = Utils.deploy_image_file(from: image_file_path, to: "goods_icon/#{goods_id}")
        PointMallGoods.changeset(goods, %{pic: image_path}) |> Repo.update!
        RedisPointMall.refresh(goods)
        AdminController.add_operate_log(acs_admin_id, app_id, "update_goods_pic", %{pic: image_path})
        conn |> json(%{success: true, pic_url: image_path})

      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end
  def update_goods_pic(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  plug :check_upload_image, [
    param_name: "file", 
    format: ["png", "jpeg", "jpg"],
    reformat: "jpg"
  ] when action == :update_goods_content_pic
  def update_goods_content_pic(conn, %{"goods_id" => goods_id, "file" => %{path: image_file_path}}) do
    {:ok, image_path} = Utils.deploy_image_file(from: image_file_path, to: "point_goods_pics/#{goods_id}")
    conn |> json(%{success: true, link: image_path})
  end

  # update_goods
  def update_goods(%Plug.Conn{private: %{acs_admin_id: user_id}} = conn, %{
                "id" => id,
                "app_id" => app_id,
                "name" => name,
                "pic" => pic,
                "description" => description,
                "price" => price,
                "postage" => postage,
                "stock" => stock,
                "is_new" => is_new} = goods) do
    case is_new do
      true ->
        # add new
        count = Repo.one!(from g in PointMallGoods, select: count(1), where: g.app_id == ^app_id and g.id == ^id)
        if(count > 0) do
          conn |> json(%{success: false, i18n_message: "admin.mall.sameGoodsIdExist"})
        else
          goods = goods |> Map.put("user_id", user_id)
          case PointMallGoods.changeset(%PointMallGoods{}, goods) |> Repo.insert do
            {:ok, new_goods} ->
              goods = Map.put(goods, "inserted_at", new_goods.inserted_at) |> Map.put("active", false)
              RedisPointMall.refreshById(id)
              AdminController.add_operate_log(user_id, app_id, "update_goods", goods)
              conn |> json(%{success: true, goods: goods, i18n_message: "admin.mall.addSuccess"})
            {:error, %{errors: _errors}} ->
              conn |> json(%{success: false, i18n_message: "error.server.networkError"})
          end
        end

      false ->
        # update
        case Repo.get(PointMallGoods, id) do
          nil ->
            conn |> json(%{success: false, i18n_message: "admin.mall.notExist"})

          %PointMallGoods{} = mg ->
            goods = Map.put(goods, "user_id", user_id)
            changed = PointMallGoods.changeset(mg, %{name: name, description: description, pic: pic, price: price, postage: postage, stock: stock})
            changed |> Repo.update!
            RedisPointMall.refreshById(id)
            AdminController.add_operate_log(user_id, app_id, "update_goods", changed.changes)
            conn |> json(%{success: true, goods: goods, i18n_message: "admin.mall.updateSuccess"})
        end
    end
  end
  def update_goods(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # toggle_goods_status
  def toggle_goods_status(%Plug.Conn{private: %{acs_admin_id: user_id, acs_app_id: app_id}} = conn,
                  %{"goods_id" => goods_id}) do
    case Repo.get(PointMallGoods, goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound"})
      %PointMallGoods{} = goods ->
        PointMallGoods.changeset(goods, %{active: !goods.active}) |> Repo.update!
        AdminController.add_operate_log(user_id, app_id, "toggle_goods_status", %{"goods_id" => goods_id, "active" => !goods.active})
        conn |> json(%{success: true, i18n_message: "admin.operateSuccess"})
    end
  end
  def toggle_goods_status(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # delete_goods
  def delete_goods(%Plug.Conn{private: %{acs_admin_id: user_id, acs_app_id: app_id}} = conn,
                     %{"goods_id" => goods_id} = params) do
    case Repo.get(PointMallGoods, goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound"})
      %PointMallGoods{} = goods ->
        if(goods.sold > 0) do
          conn |> json(%{success: false, i18n_message: "admin.mall.soldCanNotDelete"})
        else
          case Repo.delete(goods) do
            {:ok, _} ->
              RedisPointMall.delete(goods_id)
              AdminController.add_operate_log(user_id, app_id, "delete_goods", params)
              conn |> json(%{success: true, i18n_message: "admin.operateSuccess"})

            {:error, %{errors: errors}} ->
              conn |> json(%{success: false, message: translate_errors(errors)})
          end
        end
    end
  end
  def delete_goods(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def get_goods_detail(conn,%{"goods_id" =>goods_id})do
    goods = RedisMall.find(goods_id)
    add_goods_click(goods_id,1)
    conn |> json(%{success: true, goods: goods})
  end
  def get_goods_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  defp add_goods_click(goods_id, click) do
    goods = Repo.get(PointMallGoods, goods_id)
    PointMallGoods.changeset(goods, %{reads: goods.reads+click}) |> Repo.update()
    RedisPointMall.refresh(goods)
  end


end
