defmodule AcsWeb.Admin.ForumController do
  use AcsWeb, :controller

  alias Acs.Admin
  import  Acs.UploadImagePlugs

  plug :check_upload_image, [
    param_name: "file", 
    square: true,
    min_width: 128,
    format: "png",
    resize: [width: 128, height: 128]] when action == :update_forum_icon
  def update_forum_icon(conn, %{"forum_id" => forum_id, "file" => %{path: image_file_path}} = _params) do
    case Repo.get(Forum, forum_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.forumNotFound", i18n_message_object: %{forum_id: forum_id}})

      %Forum{} = forum ->
        {:ok, icon_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "forum_icons")
        Forum.changeset(forum, %{icon: icon_path}) |> Repo.update!
        CachedForum.refresh(forum_id)
        conn |> json(%{success: true, icon_url: icon_path})

      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end

  # update_forum_info
  def update_forum_info(%Plug.Conn{private: %{acs_admin_id: acs_admin_id, acs_app_id: app_id}} = conn, %{"forum" => %{"id" => forum_id} = forum_info}) do
    case Repo.get_by(Forum, id: forum_id, app_id: app_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.forumNotFound"})

      %Forum{} = forum ->
        changed = Forum.changeset(forum, forum_info)
        changed |> Repo.update!
        CachedForum.refresh(forum_id)
        CachedApp.refresh(forum.app_id)
        Admin.log_admin_operation(acs_admin_id, app_id, "update_forum_info", changed.changes)
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
                          "id" => id,
                          "title" => _title,
                          "sort" => _sort,
                          "active" => _active,
                          "forum_id" => _forum_id} = section}) do
    case Repo.get(ForumSection, id) do
      nil ->
        case ForumSection.changeset(%ForumSection{}, section) |> Repo.insert do
          {:ok, new_section} ->
            CachedForum.refresh(new_section.forum_id)
            Admin.log_admin_operation(acs_admin_id, app_id, "update_section_info", section)
            conn |> json(%{success: true, section: new_section })

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end

      %ForumSection{} = old_section ->
        changed = ForumSection.changeset(old_section, section)
        case changed |> Repo.update do
          {:ok, new_section} ->
            CachedForum.refresh(new_section.forum_id)
            Admin.log_admin_operation(acs_admin_id, app_id, "update_section_info", changed.changes)
            conn |> json(%{success: true, section: new_section })

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end
    end
  end

end
