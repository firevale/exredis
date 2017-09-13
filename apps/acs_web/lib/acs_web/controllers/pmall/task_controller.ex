defmodule AcsWeb.TaskController do
  use AcsWeb, :controller

  def get_task_list(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, _params) do
    query = from tb in TaskBar,
              select: map(tb, [:id, :pic, :name, :sub_name, :point, :path, :active]),
              where: tb.app_id == ^app_id,
              order_by: [desc: tb.sort]

    tasks = Repo.all(query)

    conn |> json(%{success: true, tasks: tasks})
  end

  # update_task
  def update_task(%Plug.Conn{private: %{acs_admin_id: _admin_id, acs_app_id: app_id}} = conn, %{
                            "id" => id,
                            "name" => name,
                            "sub_name" => sub_name,
                            "point" => point, 
                            "path" => path,
                            "active" => active,
                            "sort" => sort
                            } = task) do
  case Repo.get(TaskBar, id) do
  nil ->
  # add new
  case TaskBar.changeset(%TaskBar{}, task) |> Repo.insert do
    {:ok, new_task} ->
      task = Map.put(task, "id", new_task.id) |> Map.put("inserted_at", new_task.inserted_at) |> Map.put("sort", new_task.id)
      TaskBar.changeset(new_task, %{sort: new_task.id}) |> Repo.update!
      conn |> json(%{success: true, task: task, i18n_message: "admin.point.task.addSuccess"})
    {:error, %{errors: _errors}} ->
      conn |> json(%{success: false, message: "admin.error.networkError"})
  end

  %TaskBar{} = ns ->
    # update
    TaskBar.changeset(ns, %{name: name, sub_name: sub_name, path: path, active: active, sort: sort}) |> Repo.update!
    task = Map.put(task, "id", ns.id) |> Map.put("inserted_at", ns.inserted_at)
    conn |> json(%{success: true, task: task, i18n_message: "admin.point.task.updateSuccess"})
  end

  end
  def update_task(conn, _) do
    conn |> json(%{success: false, action: "login", i18n_message: "error.server.badRequestParams"})
  end

  # toggle_article_status
  def toggle_task_status(%Plug.Conn{private: %{acs_admin_id: _admin_id}} = conn, %{"task_id" => task_id}) do
    case Repo.get(TaskBar, task_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "admin.point.task.taskNotFound"})

      %TaskBar{} = task ->
        TaskBar.changeset(task, %{active: !task.active}) |> Repo.update!
        conn |> json(%{success: true, i18n_message: "admin.operateSuccess"})
    end
  end
  def toggle_task_status(conn, _) do
    conn |> json(%{success: false, action: "login", i18n_message: "error.server.badRequestParams"})
  end

  # update_article_pic
  plug :check_upload_image, [
    param_name: "file", 
    format: ["png", "jpg", "jpeg"],
    reformat: "jpg"] when action == :upload_task_pic
  def upload_task_pic(%Plug.Conn{private: %{acs_admin_id: _admin_id}} = conn, 
                              %{"task_id" => task_id, 
                              "file" => %{path: image_file_path}} = params) do
    case Repo.get(TaskBar, task_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "admin.point.task.taskNotFound"})

      %TaskBar{} = task ->
        {:ok, image_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "task_pics/#{task_id}")
        TaskBar.changeset(task, %{pic: image_path}) |> Repo.update!
        conn |> json(%{success: true, pic: image_path})
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end
  def upload_task_pic(conn, _) do
    conn |> json(%{success: false, action: "login", i18n_message: "error.server.badRequestParams"})
  end

  

end
