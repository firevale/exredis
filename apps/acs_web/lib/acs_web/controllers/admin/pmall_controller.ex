defmodule AcsWeb.Admin.PMallController do
  use AcsWeb, :controller

  plug :check_is_admin 

  # update_goods_pic
  plug :check_upload_image, [
    param_name: "file", 
    square: true,
    format: ["png", "jpeg", "jpg"],
    reformat: "jpg"] when action == :update_goods_pic
  def update_goods_pic(%Plug.Conn{private: %{acs_admin_id: acs_admin_id, acs_app_id: app_id}} = conn, 
                      %{"goods_id" => goods_id, "file" => %{path: image_file_path}}) do
   case PMalls.get_mall_goods(goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound", i18n_message_object: %{goods_id: goods_id}})

      %PMallGoods{} = goods ->
        {:ok, image_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "goods_icon/#{goods_id}")
        PMalls.update_mall_goods_pic(goods, image_path)
        Admin.log_admin_operation(acs_admin_id, app_id, "update_pmall_goods_pic", %{pic: image_path})

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
                "id" => _id,
                "app_id" => _app_id,
                "name" => _name,
                "pic" => _pic,
                "description" => _description,
                "price" => _price,
                "postage" => _postage,
                "stock" => _stock,
                "is_virtual" => _is_virtual,
                "begin_time" => _begin_time,
                "end_time" => _end_time,
                "is_new" => _is_new} = goods) do
    case PMalls.update_pmall_goods(user_id, goods) do
      :exist ->
        conn |> json(%{success: false, i18n_message: "admin.mall.sameGoodsIdExist"})
      {:add_ok, goods} ->
        Admin.log_admin_operation(user_id, goods.app_id, "update_goods", goods)
        conn |> json(%{success: true, goods: goods, i18n_message: "admin.mall.addSuccess"})
      :error ->
        conn |> json(%{success: false, i18n_message: "error.server.networkError"})
      nil ->
        conn |> json(%{success: false, i18n_message: "admin.mall.notExist"})
      {:update_ok, goods, changes} ->
        Admin.log_admin_operation(user_id, goods.app_id, "update_goods", changes)
        conn |> json(%{success: true, goods: goods, i18n_message: "admin.mall.updateSuccess"})
    end
  end
  def update_goods(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # toggle_goods_status
  def toggle_goods_status(%Plug.Conn{private: %{acs_admin_id: user_id, acs_app_id: app_id}} = conn,
                  %{"goods_id" => goods_id}) do
    case PMalls.toggle_goods_status(goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound"})
      {:ok, active} ->
        Admin.log_admin_operation(user_id, app_id, "toggle_pmall_goods_status", %{"goods_id" => goods_id, "active" => active})
        conn |> json(%{success: true, i18n_message: "admin.operateSuccess"}) 
    end
  end
  def toggle_goods_status(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # delete_goods
  def delete_goods(%Plug.Conn{private: %{acs_admin_id: user_id, acs_app_id: app_id}} = conn,
                   %{"goods_id" => goods_id} = params) do
    case PMalls.delete_goods(goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound"})
      :sold ->
        conn |> json(%{success: false, i18n_message: "admin.mall.soldCanNotDelete"})
      :ok ->
        Admin.log_admin_operation(user_id, app_id, "delete_pmall_goods", params)
        conn |> json(%{success: true, i18n_message: "admin.operateSuccess"})
      {:error, errors} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
    end
  end
  def delete_goods(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def get_point_logs(%Plug.Conn{private: %{acs_session_user_id: _user_id, acs_app_id: app_id}} = conn, 
                                         %{"user_id" => user_id, "page" => page, "records_per_page" => records_per_page}) do
    {:ok, logs, total_page} = PMalls.get_point_logs(app_id, user_id, page, records_per_page)
    conn |> json(%{success: true, logs: logs, total: total_page})
  end

  def admin_add_point(%Plug.Conn{private: %{acs_session_user_id: user_id, acs_app_id: app_id}} = conn, %{"point" => _point, "memo" => _memo} = log) do
    case PMalls.admin_add_point(user_id, app_id, log) do
      {:ok, log} ->
        conn |> json(%{success: true, log: log})
      {:error, errors} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
    end
  end


end