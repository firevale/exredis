defmodule AcsWeb.Admin.PMallController do
  use AcsWeb, :controller

  plug :check_is_admin 

    # list_pmall_goods
  def list_pmall_goods(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, 
                                      %{"page" => page, 
                                      "records_per_page" => records_per_page,
                                      "keyword" => keyword}) do
    case PMalls.list_pmall_goods_admin(app_id, page, records_per_page, keyword) do
      :zero ->
        conn |> json(%{success: true, total: 0, goodses: []})
      {:ok, goodses, total_page} ->
        conn |> json(%{success: true, goodses: goodses, total: total_page})
    end
  end
  def list_pmall_goods(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def get_pmall_goods_detail(conn,%{"goods_id" =>goods_id})do
    goods = PMalls.get_pmall_goods_detail(goods_id)
    conn |> json(%{success: true, goods: goods})
  end

  # update_goods_pic
  plug :check_upload_image, [
    param_name: "file", 
    format: ["png", "jpeg", "jpg"],
    reformat: "jpg"] when action == :update_goods_pic
  def update_goods_pic(%Plug.Conn{private: %{acs_admin_id: acs_admin_id, acs_app_id: app_id}} = conn, 
                      %{"goods_id" => goods_id, "file" => %{path: image_file_path}}) do
   case PMalls.get_pmall_goods(goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound", i18n_message_object: %{goods_id: goods_id}})

      %PMallGoods{} = goods ->
        {:ok, image_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "goods_icon/#{goods_id}")
        PMalls.update_pmall_goods_pic(goods, image_path)
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

  # update_pmall_goods
  def update_pmall_goods(%Plug.Conn{private: %{acs_admin_id: user_id}} = conn, %{
                "id" => _id,
                "app_id" => _app_id,
                "name" => _name,
                "pic" => _pic,
                "description" => _description,
                "price" => _price,
                "original_price" => _original_price,
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
        Admin.log_admin_operation(user_id, goods["app_id"], "update_pmall_goods", goods)
        conn |> json(%{success: true, goods: goods, i18n_message: "admin.mall.addSuccess"})
      :error ->
        conn |> json(%{success: false, i18n_message: "error.server.networkError"})
      nil ->
        conn |> json(%{success: false, i18n_message: "admin.mall.notExist"})
      {:update_ok, goods, changes} ->
        Admin.log_admin_operation(user_id, goods["app_id"], "update_pmall_goods", changes)
        conn |> json(%{success: true, goods: goods, i18n_message: "admin.mall.updateSuccess"})
    end
  end
  def update_pmall_goods(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # toggle_pmall_goods_status
  def toggle_pmall_goods_status(%Plug.Conn{private: %{acs_admin_id: user_id, acs_app_id: app_id}} = conn,
                  %{"goods_id" => goods_id}) do
    case PMalls.toggle_pmall_goods_status(goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound"})
      {:ok, active} ->
        Admin.log_admin_operation(user_id, app_id, "toggle_pmall_goods_status", %{"goods_id" => goods_id, "active" => active})
        conn |> json(%{success: true, i18n_message: "admin.operateSuccess"}) 
    end
  end
  def toggle_pmall_goods_status(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # delete_pmall_goods
  def delete_pmall_goods(%Plug.Conn{private: %{acs_admin_id: user_id, acs_app_id: app_id}} = conn,
                   %{"goods_id" => goods_id} = params) do
    case PMalls.delete_pmall_goods(goods_id) do
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
  def delete_pmall_goods(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def list_pmall_point_logs(%Plug.Conn{private: %{acs_session_user_id: _user_id, acs_app_id: app_id}} = conn, 
                                         %{"user_id" => user_id, "page" => page, "records_per_page" => records_per_page}) do
    {:ok, logs, total_page} = PMalls.list_pmall_point_logs(app_id, user_id, page, records_per_page)
    conn |> json(%{success: true, logs: logs, total: total_page})
  end

  def admin_add_pmall_point(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, 
                                        %{"nickame" => nickame, 
                                        "point" => _point, 
                                        "memo" => _memo} = log) do
    wcp_user_id = case Acs.Wcp.get_app_wcp_user(app_id, nickame) do
                    nil -> nil
                    %AppWcpUser{} = u -> u.id
                  end
    if(!wcp_user_id) do
      conn |> json(%{success: false, i18n_message: "admin.point.userNotExist"})
    end
    case PMalls.admin_add_pmall_point(wcp_user_id, app_id, log) do
      {:ok, log} ->
        conn |> json(%{success: true, log: log})
      {:error, errors} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
    end
  end

  def get_task_list(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, _params) do
    tasks = PMalls.get_task_list(app_id)
    conn |> json(%{success: true, tasks: tasks})
  end

  # update_task
  def update_task(%Plug.Conn{private: %{acs_admin_id: _admin_id, acs_app_id: _app_id}} = conn, %{
                            "id" => _id,
                            "name" => _name,
                            "sub_name" => _sub_name,
                            "point" => _point, 
                            "path" => _path,
                            "active" => _active,
                            "sort" => _sort
                            } = task) do
    case PMalls.update_task(task) do
      {:addok, task} ->
        conn |> json(%{success: true, task: task, i18n_message: "admin.point.task.addSuccess"})
      {:updateok, task} ->
        conn |> json(%{success: true, task: task, i18n_message: "admin.point.task.updateSuccess"})
      :error ->
        conn |> json(%{success: false, message: "admin.error.networkError"})
    end
  end
  def update_task(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # toggle_article_status
  def toggle_task_status(%Plug.Conn{private: %{acs_admin_id: _admin_id}} = conn, %{"task_id" => task_id}) do
    case PMalls.toggle_task_status(task_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "admin.point.task.taskNotFound"})
      :ok ->
        conn |> json(%{success: true, i18n_message: "admin.operateSuccess"})
    end
  end
  def toggle_task_status(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # update_article_pic
  plug :check_upload_image, [
    param_name: "file", 
    format: ["png", "jpg", "jpeg"],
    reformat: "jpg"] when action == :upload_task_pic
  def upload_task_pic(%Plug.Conn{private: %{acs_admin_id: _admin_id}} = conn, 
                              %{"task_id" => task_id, 
                              "file" => %{path: image_file_path}}) do
    case PMalls.get_task(task_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "admin.point.task.taskNotFound"})

      %TaskBar{} = task ->
        {:ok, image_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "task_pics/#{task_id}")
        PMalls.update_task_pic(task, image_path)
        conn |> json(%{success: true, pic: image_path})
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end
  def upload_task_pic(conn, _) do
    conn |> json(%{success: false, action: "login", i18n_message: "error.server.badRequestParams"})
  end

  def delete_task(%Plug.Conn{private: %{acs_admin_id: _admin_id}} = conn, 
                              %{"task_id" => task_id}) do
    case PMalls.delete_task(task_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
      :ok ->
        conn |> json(%{success: true, i18n_message: "admin.operateSuccess"})
      :error ->
        conn |> json(%{success: false, message: "admin.error.networkError"})
    end
  end

  def change_taskbars_sort(%Plug.Conn{private: %{acs_admin_id: _admin_id}} = conn, 
                                      %{"needChange" => need_change}) do
    :ok = PMalls.change_taskbars_sort(need_change)
    conn |> json(%{success: true, i18n_message: "admin.operateSuccess"})
  end

  def list_pmall_questions(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, 
                                      %{"page" => page, 
                                      "records_per_page" => records_per_page}) do
    {:ok, questions, total_page} = PMalls.list_pmall_questions(app_id, page, records_per_page)
    conn |> json(%{success: true, questions: questions, total: total_page})
  end

  def update_pmall_question(%Plug.Conn{private: %{acs_admin_id: user_id}} = conn, %{
                "id" => _id,
                "app_id" => _app_id,
                "question" => _question,
                "correct" => _correct,
                "a1" => _a1,
                "a2" => _a2} = question) do
    case PMalls.update_pmall_question(question) do
      {:addok, question} ->
        Admin.log_admin_operation(user_id, question["app_id"], "update_pmall_question", question)
        conn |> json(%{success: true, question: question, i18n_message: "admin.point.question.addSuccess"})
      :error ->
        conn |> json(%{success: false, i18n_message: "error.server.networkError"})
      {:updateok, question, changes} ->
        Admin.log_admin_operation(user_id, question["app_id"], "update_pmall_question", changes)
        conn |> json(%{success: true, question: question, i18n_message: "admin.point.question.updateSuccess"})
    end
  end

  def delete_pmall_question(%Plug.Conn{private: %{acs_admin_id: user_id, acs_app_id: app_id}} = conn,
                   %{"question_id" => question_id} = params) do
    case PMalls.delete_pmall_question(question_id)do
      nil ->
        conn |> json(%{success: false, i18n_message: "admin.point.question.questionNotFound"})
      :ok ->
        Admin.log_admin_operation(user_id, app_id, "delete_pmall_question", params)
        conn |> json(%{success: true, i18n_message: "admin.operateSuccess"})
      :error ->
        conn |> json(%{success: false, i18n_message: "admin.error.networkError"})
    end
  end

end