defmodule AcsWeb.Admin.PMallController do
  use AcsWeb, :controller

  alias Acs.PMalls
  alias Acs.Admin

  plug :check_is_admin 

  # update_goods_pic
  plug :check_upload_image, [
    param_name: "file", 
    square: true,
    format: ["png", "jpeg", "jpg"],
    reformat: "jpg"] when action == :update_goods_pic
  def update_goods_pic(%Plug.Conn{private: %{acs_admin_id: acs_admin_id, acs_app_id: app_id}} = conn, 
                      %{"goods_id" => goods_id, "file" => %{path: image_file_path}}) do
   case Repo.get(PMallGoods, goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound", i18n_message_object: %{goods_id: goods_id}})

      %PMallGoods{} = goods ->
        {:ok, image_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "goods_icon/#{goods_id}")
        PMallGoods.changeset(goods, %{pic: image_path}) |> Repo.update!
        CachedPMallGoods.refresh(goods)
        Admin.log_admin_operation(acs_admin_id, app_id, "update_goods_pic", %{pic: image_path})

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
    {:ok, image_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "point_goods_pics/#{goods_id}")
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
                "is_virtual" => _is_virtual,
                "begin_time" => _begin_time,
                "end_time" => _end_time,
                "is_new" => is_new} = goods) do
    case is_new do
      true ->
        # add new
        count = Repo.one!(from g in PMallGoods, select: count(1), where: g.app_id == ^app_id and g.id == ^id)
        if(count > 0) do
          conn |> json(%{success: false, i18n_message: "admin.mall.sameGoodsIdExist"})
        else
          goods = goods |> Map.put("user_id", user_id)
          case PMallGoods.changeset(%PMallGoods{}, goods) |> Repo.insert do
            {:ok, new_goods} ->
              goods = Map.put(goods, "inserted_at", new_goods.inserted_at) |> Map.put("active", false)
              CachedPMallGoods.refresh(id)
              Admin.log_admin_operation(user_id, app_id, "update_goods", goods)

              conn |> json(%{success: true, goods: goods, i18n_message: "admin.mall.addSuccess"})
            {:error, %{errors: _errors}} ->
              conn |> json(%{success: false, i18n_message: "error.server.networkError"})
          end
        end

      false ->
        # update
        case Repo.get(PMallGoods, id) do
          nil ->
            conn |> json(%{success: false, i18n_message: "admin.mall.notExist"})

          %PMallGoods{} = mg ->
            goods = Map.put(goods, "user_id", user_id)

            changed = PMallGoods.changeset(mg, %{name: name, description: description, pic: pic, price: price, postage: postage, stock: stock})
            changed |> Repo.update!
            CachedPMallGoods.refresh(id)
            Admin.log_admin_operation(user_id, app_id, "update_goods", changed.changes)

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
    case Repo.get(PMallGoods, goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound"})

      %PMallGoods{} = goods ->
        PMallGoods.changeset(goods, %{active: !goods.active}) |> Repo.update!
        Admin.log_admin_operation(user_id, app_id, "toggle_goods_status", %{"goods_id" => goods_id, "active" => !goods.active})

        conn |> json(%{success: true, i18n_message: "admin.operateSuccess"})
    end
  end
  def toggle_goods_status(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # delete_goods
  def delete_goods(%Plug.Conn{private: %{acs_admin_id: user_id, acs_app_id: app_id}} = conn,
                   %{"goods_id" => goods_id} = params) do
    case Repo.get(PMallGoods, goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound"})
      %PMallGoods{} = goods ->
        if(goods.sold > 0) do
          conn |> json(%{success: false, i18n_message: "admin.mall.soldCanNotDelete"})
        else
          case Repo.delete(goods) do
            {:ok, _} ->
              CachedPMallGoods.del(goods_id)
              Admin.log_admin_operation(user_id, app_id, "delete_goods", params)

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

  def get_point_logs(%Plug.Conn{private: %{acs_session_user_id: _user_id, acs_app_id: app_id}} = conn, 
                                         %{"user_id" => user_id, "page" => page, "records_per_page" => records_per_page}) do
    totalQuery = from pl in PointLog, where: pl.app_id == ^app_id, select: count(pl.id)
    totalQuery = case String.length(user_id) do
      0 -> totalQuery
      _ -> where(totalQuery, [pl], pl.user_id == ^user_id)
    end
    total_page = round(Float.ceil(Repo.one!(totalQuery) / records_per_page))

    query = from pl in PointLog,
              join: u in assoc(pl, :user),
              select: map(pl, [:id, :log_type, :point, :memo, :user_id, :inserted_at, user: [:id, :email]]),
              limit: ^records_per_page,
              where: pl.app_id == ^app_id,
              offset: ^((page - 1) * records_per_page),
              order_by: [desc: pl.id],
              preload: [user: u]

    query = case String.length(user_id) do
      0 -> query
      _ -> where(query, [pl], pl.user_id == ^user_id)
    end
    logs = Repo.all(query)

    conn |> json(%{success: true, logs: logs, total: total_page})
  end

  def admin_add_point(%Plug.Conn{private: %{acs_session_user_id: user_id, acs_app_id: app_id}} = conn, %{"point" => _point, "memo" => _memo} = log) do
    log = Map.put(log, "app_id", app_id) |> Map.put("user_id", user_id) |> Map.put("log_type", "admin_op")
    AcsWeb.PMallController.add_point(conn, log)
  end


end