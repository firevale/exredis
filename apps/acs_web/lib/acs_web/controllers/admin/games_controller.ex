defmodule AcsWeb.Admin.GamesController do
  use AcsWeb, :controller

  plug :check_is_admin 

  # update_news
  def update_news(%Plug.Conn{private: %{acs_admin_id: user_id}} = conn, %{
                  "news_id" => _news_id,
                  "app_id" => app_id,
                  "title" => _title,
                  "content" => _content,
                  "group" => _group,
                  "is_top" => _is_top} = news) do
    case Apps.update_news(user_id, news) do
      {:ok, new_news, changes} ->
        Admin.log_admin_operation(user_id, app_id, "update_news", changes)
        conn |> json(%{success: true, news: new_news, i18n_message: "admin.news.updateSuccess"})
      {:ok, new_news} ->
        Admin.log_admin_operation(user_id, app_id, "update_news", new_news)
        conn |> json(%{success: true, news: new_news, i18n_message: "admin.news.addSuccess"})
      :error ->
        conn |> json(%{success: false, message: "admin.error.networkError"})
    end
  end
  def update_news(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # toggle_news_status
  def toggle_news_status(%Plug.Conn{private: %{acs_admin_id: user_id, acs_app_id: app_id}} = conn,
                  %{"news_id" => news_id}) do
    
    case Apps.toggle_news_status(news_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.newsNotFound"})
      {:ok, active} ->
        Admin.log_admin_operation(user_id, app_id, "toggle_news_status", %{"news_id" => news_id, "active" => active})
        conn |> json(%{success: true, i18n_message: "admin.operateSuccess"})
    end
  end
  def toggle_news_status(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # update_news_pic
  plug :check_upload_image, [
    param_name: "file", 
    ratio: 0.41,
    min_width: 640,
    min_height: 260,
    format: ["png", "jpg", "jpeg"],
    reformat: "jpg",
    resize_to_limit: [width: 640, height: 260]] when action == :update_news_title_picture
  def update_news_title_picture(%Plug.Conn{private: %{acs_admin_id: _user_id}} = conn, 
                      %{"news_id" => news_id, "file" => %{path: image_file_path}}) do
    case Apps.get_news(news_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.newsNotFound", i18n_message_object: %{news_id: news_id}})

      %AppNews{} = news ->
        {:ok, image_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "news_pics/#{news_id}")
        Apps.update_news_pic(news, image_path)

        conn |> json(%{success: true, pic: image_path})
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end
  def update_news_title_picture(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  plug :check_upload_image, [
    param_name: "file", 
    format: ["png", "jpg", "jpeg"],
    reformat: "jpg"
    ] when action == :upload_news_pic
  def upload_news_pic(conn, %{"app_id" => app_id, "file" => %{path: image_file_path}}) do
    {:ok, image_path, width, height} = 
      DeployUploadedFile.deploy_image_file_return_size(
        from: image_file_path, 
        to: "news_pics/#{app_id}", 
        low_quality: true)
    conn |> json(%{success: true, link: image_path, width: width, height: height})
  end
  def upload_news_pic(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end


  def get_paged_news_admin(%Plug.Conn{private: %{acs_admin_id: _user_id}} = conn, 
                          %{"app_id" => app_id,
                          "group" => group,
                          "page" => page, 
                          "records_per_page" => records_per_page}) do
    {:ok, news, total_page, total} = Apps.get_paged_news_admin(app_id, group, page, records_per_page)
    conn |> json(%{success: true, news: news, total: total_page, records: total})
  end
  def get_paged_news_admin(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end    
  
end