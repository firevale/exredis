defmodule AcsWeb.Admin.MallController do
  use AcsWeb, :controller

  # update_mall_icon
  plug :check_upload_image, [
    param_name: "file", 
    square: true,
    min_width: 128,
    format: "png",
    resize_to_limit: [width: 128, height: 128]] when action == :update_mall_icon
  def update_mall_icon(conn, %{"mall_id" => mall_id, "file" => %{path: image_file_path}}) do
    case Repo.get(Mall, mall_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.mallNotFound", i18n_message_object: %{mall_id: mall_id}})

      %Mall{} = mall ->
        {:ok, icon_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "mall_icons")
        Mall.changeset(mall, %{icon: icon_path}) |> Repo.update!
        conn |> json(%{success: true, icon_url: icon_path})
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end

  # update_mall_info
  def update_mall_info(%Plug.Conn{private: %{acs_admin_id: acs_admin_id, acs_app_id: app_id}} = conn, 
                                %{"mall" => %{"id" => mall_id} = mall_info}) do
    case Repo.get_by(Mall, id: mall_id, app_id: app_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.mallNotFound"})

      %Mall{} = mall ->
        changed = Mall.changeset(mall, mall_info)
        changed |> Repo.update!
        CachedApp.refresh(mall.app_id)
        AdminController.add_operate_log(acs_admin_id, app_id, "update_mall_info", changed.changes)
        conn |> json(%{success: true, i18n_message: "admin.serverSuccess.mallUpdated"})
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
   case Repo.get(MallGoods, goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound", i18n_message_object: %{goods_id: goods_id}})

      %MallGoods{} = goods ->
        {:ok, image_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "goods_icon/#{goods_id}")
        MallGoods.changeset(goods, %{pic: image_path}) |> Repo.update!
        CachedMallGoods.refresh(goods)
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
    {:ok, image_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "goods_pics/#{goods_id}")
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
        count = Repo.one!(from g in MallGoods, select: count(1), where: g.app_id == ^app_id and g.id == ^id)
        if(count > 0) do
          conn |> json(%{success: false, i18n_message: "admin.mall.sameGoodsIdExist"})
        else
          goods = goods |> Map.put("user_id", user_id)
          case MallGoods.changeset(%MallGoods{}, goods) |> Repo.insert do
            {:ok, new_goods} ->
              goods = Map.put(goods, "inserted_at", new_goods.inserted_at) |> Map.put("active", false)
              CachedMallGoods.refresh(id)
              AdminController.add_operate_log(user_id, app_id, "update_goods", goods)
              conn |> json(%{success: true, goods: goods, i18n_message: "admin.mall.addSuccess"})
            {:error, %{errors: _errors}} ->
              conn |> json(%{success: false, i18n_message: "error.server.networkError"})
          end
        end

      false ->
        # update
        case Repo.get(MallGoods, id) do
          nil ->
            conn |> json(%{success: false, i18n_message: "admin.mall.notExist"})

          %MallGoods{} = mg ->
            goods = Map.put(goods, "user_id", user_id)
            changed = MallGoods.changeset(mg, %{name: name, description: description, pic: pic, price: price, postage: postage, stock: stock})
            changed |> Repo.update!
            CachedMallGoods.refresh(id)
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
    case Repo.get(MallGoods, goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound"})
      %MallGoods{} = goods ->
        MallGoods.changeset(goods, %{active: !goods.active}) |> Repo.update!
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
    case Repo.get(MallGoods, goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound"})
      %MallGoods{} = goods ->
        if(goods.sold > 0) do
          conn |> json(%{success: false, i18n_message: "admin.mall.soldCanNotDelete"})
        else
          case Repo.delete(goods) do
            {:ok, _} ->
              CachedMallGoods.del(goods_id)
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

  def update_order_paid(conn, %{"order_id" => "", "transaction_id" => ""}),
    do: json(conn, %{success: false, i18n_message: "mall.order.messages.illegal"})
  def update_order_paid(%Plug.Conn{private: %{acs_admin_id: admin_user_id}} = conn, %{"order_id" => order_id, "transaction_id" => transaction_id}) do
    order = fetch_order_info(order_id)
    payed_status = 1
    admin_user = CachedUser.get(admin_user_id)

    if order.status !=0 and order.status != -1 do
      json(conn, %{success: false, i18n_message: "admin.mall.order.messages.onlyCancelOrUnpay"})
    else
      result = 
        Repo.transaction(fn ->
          Enum.each(order.details, fn(detail) ->
            goods = Repo.get(MallGoods, detail.mall_goods_id)
            if detail.amount>goods.stock do
              Repo.rollback("admin.mall.order.messages.stockOut")
            else
              MallGoods.changeset(goods, %{stock: goods.stock - detail.amount, sold: goods.sold + detail.amount}) |> Repo.update()
              CachedMallGoods.refresh(goods)
            end
          end)

          from( od in MallOrder, where: od.id == ^order.id) |> Repo.update_all( set: [status: payed_status ,transaction_id: transaction_id])
          MallOrderLog.changeset(%MallOrderLog{},%{ mall_order_id: order_id,  status: order.status, changed_status: payed_status, admin_user: admin_user.email, content: %{ transaction_id: transaction_id} }) |> Repo.insert
        end)

      case result do
        {:error, i18n_message} ->
          json(conn, %{success: false, i18n_message: i18n_message})
        _ ->
          Elasticsearch.update(%{ index: "mall", type: "orders", doc: %{ doc: %{ transaction_id: transaction_id}}, params: nil, id: order_id})
          order = fetch_order_info(order_id)
          json(conn, %{success: true, order: order, i18n_message: "admin.mall.order.messages.opSuccess"})
      end
    end
  end

  def refund_order(%Plug.Conn{private: %{acs_admin_id: admin_user_id}} = conn, %{"order_id" => order_id, "refund_money" => refund_money}) do
    order = fetch_order_info(order_id)
    refund_free = refund_money * 100
    admin_user = CachedUser.get(admin_user_id)
    cond do
      refund_free > order.final_price ->
        json(conn, %{success: false, i18n_message: "admin.mall.order.messages.refundMoneyOut"})
      order.status !=2 ->
        json(conn, %{success: false, i18n_message: "admin.mall.order.messages.onlyRecieving"})
      true ->
        cancel_status = -1
        result = 
          Repo.transaction(fn ->
            Enum.each(order.details, fn(detail) ->
              goods = Repo.get(MallGoods, detail.mall_goods_id)
              MallGoods.changeset(goods, %{stock: goods.stock + detail.amount, sold: goods.sold - detail.amount}) |> Repo.update()
              CachedMallGoods.refresh(goods)
            end)

            from(od in MallOrder, where: od.id == ^order.id) |> Repo.update_all(set: [status: cancel_status])
            MallOrderLog.changeset(%MallOrderLog{},%{mall_order_id: order_id,  status: order.status, changed_status: cancel_status, admin_user: admin_user.email, content: %{refund_money: refund_free} }) |> Repo.insert
         end)
        case result do
          {:error, i18n_message} ->
            json(conn, %{success: false, i18n_message: i18n_message})
          _ ->
            order = fetch_order_info(order_id)
            json(conn, %{success: true, order: order, i18n_message: "admin.mall.order.messages.opSuccess"})
        end
    end
  end

end