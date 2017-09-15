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
    case Malls.get_mall(mall_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.mallNotFound", i18n_message_object: %{mall_id: mall_id}})

      %Mall{} = mall ->
        {:ok, icon_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "mall_icons")
        Malls.update_mall!(mall, %{icon: icon_path})
        
        conn |> json(%{success: true, icon_url: icon_path})
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end

  # update_mall
  def update_mall(%Plug.Conn{private: %{acs_admin_id: acs_admin_id, acs_app_id: app_id}} = conn, 
                                %{"mall" => %{"id" => _mall_id} = mall_info}) do
    case Malls.update_mall!(mall_info) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.mallNotFound"})

      {:ok, changes} ->
        Admin.log_admin_operation(acs_admin_id, app_id, "update_mall", changes)
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
   case Malls.get_mall_goods(goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound", i18n_message_object: %{goods_id: goods_id}})

      %MallGoods{} = goods ->
        {:ok, image_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "goods_icon/#{goods_id}")
        Malls.update_mall_goods_pic(goods, image_path)
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
    {:ok, image_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "goods_pics/#{goods_id}")
    conn |> json(%{success: true, link: image_path})
  end

  # update_mall_goods
  def update_mall_goods(%Plug.Conn{private: %{acs_admin_id: user_id}} = conn, %{
                "id" => _id,
                "app_id" => _app_id,
                "name" => _name,
                "pic" => _pic,
                "description" => _description,
                "price" => _price,
                "postage" => _postage,
                "stock" => _stock,
                "is_new" => _is_new} = goods) do
    case Malls.update_mall_goods(user_id, goods) do
      :exist ->
        conn |> json(%{success: false, i18n_message: "admin.mall.sameGoodsIdExist"})
      {:add_ok, goods} ->
        Admin.log_admin_operation(user_id, goods.app_id, "update_mall_goods", goods)
        conn |> json(%{success: true, goods: goods, i18n_message: "admin.mall.addSuccess"})
      :error ->
        conn |> json(%{success: false, i18n_message: "error.server.networkError"})
      nil ->
        conn |> json(%{success: false, i18n_message: "admin.mall.notExist"})
      {:update_ok, goods, changes} ->
        Admin.log_admin_operation(user_id, goods.app_id, "update_mall_goods", changes)
        conn |> json(%{success: true, goods: goods, i18n_message: "admin.mall.updateSuccess"})
    end
  end
  def update_mall_goods(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # toggle_goods_status
  def toggle_goods_status(%Plug.Conn{private: %{acs_admin_id: user_id, acs_app_id: app_id}} = conn,
                                              %{"goods_id" => goods_id}) do
    case Malls.toggle_goods_status(goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound"})
      {:ok, active} ->
        Admin.log_admin_operation(user_id, app_id, "toggle_goods_status", %{"goods_id" => goods_id, "active" => active})
        conn |> json(%{success: true, i18n_message: "admin.operateSuccess"}) 
    end
  end
  def toggle_goods_status(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # delete_mall_goods
  def delete_mall_goods(%Plug.Conn{private: %{acs_admin_id: user_id, acs_app_id: app_id}} = conn,
                     %{"goods_id" => goods_id} = params) do
    case Malls.delete_mall_goods(goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound"})
      :sold ->
        conn |> json(%{success: false, i18n_message: "admin.mall.soldCanNotDelete"})
      :ok ->
        Admin.log_admin_operation(user_id, app_id, "delete_mall_goods", params)
        conn |> json(%{success: true, i18n_message: "admin.operateSuccess"})
      {:error, errors} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
    end
  end
  def delete_mall_goods(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def set_mall_order_paid(conn, %{"order_id" => "", "transaction_id" => ""}),
    do: json(conn, %{success: false, i18n_message: "mall.order.messages.illegal"})
  def set_mall_order_paid(%Plug.Conn{private: %{acs_admin_id: admin_user_id}} = conn, %{"order_id" => order_id, "transaction_id" => transaction_id}) do
    case Malls.set_mall_order_paid(admin_user_id, order_id, transaction_id) do
      :limit ->
        json(conn, %{success: false, i18n_message: "admin.mall.order.messages.onlyCancelOrUnpay"})
      {:error, i18n_message} ->
        json(conn, %{success: false, i18n_message: i18n_message})
      {:ok, order} ->
        json(conn, %{success: true, order: order, i18n_message: "admin.mall.order.messages.opSuccess"})
    end
  end

  def refund_order(%Plug.Conn{private: %{acs_admin_id: admin_user_id}} = conn, %{"order_id" => order_id, "refund_money" => refund_money}) do
    case Malls.refund_order(admin_user_id, order_id, refund_money) do
      :out ->
        json(conn, %{success: false, i18n_message: "admin.mall.order.messages.refundMoneyOut"})
      :limit ->
        json(conn, %{success: false, i18n_message: "admin.mall.order.messages.onlyRecieving"})
      {:error, i18n_message} ->
        json(conn, %{success: false, i18n_message: i18n_message})
      {:ok, order} ->
        json(conn, %{success: true, order: order, i18n_message: "admin.mall.order.messages.opSuccess"})
    end
  end

end