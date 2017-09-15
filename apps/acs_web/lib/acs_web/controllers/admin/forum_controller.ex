defmodule AcsWeb.Admin.ForumController do
  use AcsWeb, :controller

  import  Acs.UploadImagePlugs

  plug :check_upload_image, [
    param_name: "file", 
    square: true,
    min_width: 128,
    format: "png",
    resize: [width: 128, height: 128]] when action == :update_forum_icon
  def update_forum_icon(conn, %{"forum_id" => forum_id, "file" => %{path: image_file_path}} = _params) do


    case Forums.get_forum(forum_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.forumNotFound", i18n_message_object: %{forum_id: forum_id}})

      %Forum{} = forum ->
        {:ok, icon_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "forum_icons")
        Forums.update_forum_icon(forum, icon_path)
        conn |> json(%{success: true, icon_url: icon_path})

      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end

  # update_forum_info
  def update_forum_info(%Plug.Conn{private: %{acs_admin_id: acs_admin_id, acs_app_id: app_id}} = conn, %{"forum" => %{"id" => forum_id} = forum_info}) do
    case Forums.update_forum_info(app_id, forum_id, forum_info) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.forumNotFound"})
      {:ok, changes} ->
        Admin.log_admin_operation(acs_admin_id, app_id, "update_forum_info", changes)
        conn |> json(%{success: true, i18n_message: "admin.serverSuccess.forumUpdated"})
    end
  end

  # update_section_info
  def update_section_info(conn, %{"section" => %{"title" => ""}}) do
    conn |> json(%{success: false, i18n_message: "error.server.emptySectionTitle"})
  end
  def update_section_info(conn, %{"section" => %{"forum_id" => ""}}) do
    conn |> json(%{success: false, i18n_message: "error.server.emptyForumId"})
  end
  def update_section_info(%Plug.Conn{private: %{acs_admin_id: acs_admin_id, acs_app_id: app_id}} = conn, 
                          %{"section" => %{
                          "id" => _id,
                          "title" => _title,
                          "sort" => _sort,
                          "active" => _active,
                          "forum_id" => _forum_id} = section}) do
    case Forums.update_section_info(section) do
      {:ok, new_section, changes} ->
        Admin.log_admin_operation(acs_admin_id, app_id, "update_section_info", changes)
        conn |> json(%{success: true, section: new_section })

      {:ok, new_section} ->
        Admin.log_admin_operation(acs_admin_id, app_id, "update_section_info", section)
        conn |> json(%{success: true, section: new_section })

      {:error, errors} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
    end
  end

end
