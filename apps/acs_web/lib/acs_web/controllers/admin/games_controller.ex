defmodule AcsWeb.Admin.GamesController do
  use AcsWeb, :controller

  alias Acs.Admin
  import  Acs.UploadImagePlugs

  plug :check_is_admin 

  # update_news
  def update_news(%Plug.Conn{private: %{acs_admin_id: user_id}} = conn, %{
                  "news_id" => news_id,
                  "app_id" => app_id,
                  "title" => title,
                  "content" => content,
                  "group" => _group,
                  "is_top" => is_top} = news) do
    case Repo.get(AppNews, news_id) do
      nil ->
        # add new
        news = news |> Map.put("user_id", user_id)
        case AppNews.changeset(%AppNews{}, news) |> Repo.insert do
          {:ok, new_news} ->
            news = news |> Map.put("id", new_news.id) |> Map.put("created_at", new_news.inserted_at)
            Admin.log_admin_operation(user_id, app_id, "update_news", news)
            conn |> json(%{success: true, news: news, i18n_message: "admin.news.addSuccess"})
          {:error, %{errors: _errors}} ->
            conn |> json(%{success: false, message: "admin.error.networkError"})
        end
        
      %AppNews{} = ns ->
        # update
        changed = AppNews.changeset(ns, %{title: title, content: content, is_top: is_top})
        changed |> Repo.update!
        news = news |> Map.put("id", ns.id) |> Map.put("created_at", ns.inserted_at)
        Admin.log_admin_operation(user_id, app_id, "update_news", changed.changes)
        conn |> json(%{success: true, news: news, i18n_message: "admin.news.updateSuccess"})
    end
  end
  def update_news(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # toggle_news_status
  def toggle_news_status(%Plug.Conn{private: %{acs_admin_id: user_id, acs_app_id: app_id}} = conn,
                  %{"news_id" => news_id}) do
    case Repo.get(AppNews, news_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.newsNotFound"})
      %AppNews{} = news ->
        AppNews.changeset(news, %{active: !news.active}) |> Repo.update!
        Admin.log_admin_operation(user_id, app_id, "toggle_news_status", %{"news_id" => news_id, "active" => !news.active})
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
    case Repo.get(AppNews, news_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.newsNotFound", i18n_message_object: %{news_id: news_id}})

      %AppNews{} = news ->
        {:ok, image_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "news_pics/#{news_id}")
        AppNews.changeset(news, %{pic: image_path}) |> Repo.update!
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
    total = Repo.one!(from n in AppNews, select: count(1), where: n.app_id == ^app_id and n.group == ^group)
    total_page = round(Float.ceil(total / records_per_page))

    query = from n in AppNews,
              where: n.app_id == ^app_id and n.group == ^group,
              order_by: [desc: n.id],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: map(n, [:id, :app_id, :title, :content, :group, :is_top, :active, :pic, :reads, :inserted_at])

    news = Repo.all(query)
    conn |> json(%{success: true, news: news, total: total_page, records: total})
  end
  def get_paged_news_admin(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end    
  
end