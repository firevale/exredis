defmodule Acs.Web.GamesController do
  use Acs.Web, :controller

  import  Acs.UploadImagePlugs

  plug :fetch_access_token
  plug :fetch_session_user_id
  plug :cache_page, [cache_seconds: 600] when action in [:fetch_apps, :get_top_news, :get_paged_news, :get_news_detail]
  plug :check_is_admin when action in [:update_news, :toggle_news_status, :get_paged_news_admin, :update_news_pic]

  # fetch_apps
  def fetch_apps(conn, _params) do
    query = from app in App,
            order_by: [desc: app.inserted_at],
            where: app.active == true,
            select: map(app, [:id, :name, :icon])

    apps = Repo.all(query)

    conn |> json(%{success: true, apps: apps})
  end

  # get_top_news
  def get_top_news(conn, %{"app_id" => app_id,
                           "limit" => limit}) do
    query = from n in AppNews,
              where: n.app_id == ^app_id and n.group == "news" and n.active == true and n.is_top == true,
              order_by: [desc: n.id],
              limit: ^limit,
              select: map(n, [:id, :title, :content, :pic, :reads, :inserted_at])

    news = Repo.all(query)
    conn |> json(%{success: true, news: news})
  end
  def get_top_news(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # get_paged_news
  def get_paged_news(conn, %{"app_id" => app_id,
                             "group" => group,
                             "page" => page, 
                             "records_per_page" => records_per_page}) do
    total = Repo.one!(from n in AppNews, 
                      select: count(1), 
                      where: n.app_id == ^app_id and n.group == ^group and n.active == true)
    total_page = round(Float.ceil(total / records_per_page))

    fields = case group do 
              "notice" -> 
                [:id, :title, :content, :is_top, :active, :pic, :reads, :inserted_at]
              _ ->
                [:id, :title, :is_top, :active, :pic, :reads, :inserted_at]
             end

    query = from n in AppNews,
              where: n.app_id == ^app_id and n.group == ^group and n.active == true,
              order_by: [desc: n.id],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: map(n, ^fields)

    news = Repo.all(query)
    conn |> json(%{success: true, news: news, total: total_page, records: total})
  end
  def get_paged_news(conn, _) do
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
  
  # get_news_detail
  def get_news_detail(conn,%{"news_id" => news_id}) do
    query = from n in AppNews,
          join: u in assoc(n, :user),
          where: n.id == ^news_id,
          order_by: [desc: n.id],
          select: map(n, [:id, :title, :content, :is_top, :active, :pic, :reads, :inserted_at,
                          user: [:id, :nickname, :avatar_url]]),
          preload: [user: u]

    news = Repo.one(query)

    add_news_click(news_id, 1)

    conn |> json(%{success: true, news: news})
  end
  def get_news_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  defp add_news_click(news_id, click) do
    news = Repo.get(AppNews, news_id)
    AppNews.changeset(news, %{reads: news.reads+click}) |> Repo.update()
  end

  # update_news
  def update_news(%Plug.Conn{private: %{acs_admin_id: user_id}} = conn, %{
                  "news_id" => news_id,
                  "app_id" => _app_id,
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
            conn |> json(%{success: true, news: news, i18n_message: "admin.news.addSuccess"})
          {:error, %{errors: _errors}} ->
            conn |> json(%{success: false, message: "admin.error.networkError"})
        end
        
      %AppNews{} = ns ->
        # update
        AppNews.changeset(ns, %{title: title, content: content, is_top: is_top}) |> Repo.update!
        news = news |> Map.put("id", ns.id) |> Map.put("created_at", ns.inserted_at)
        conn |> json(%{success: true, news: news, i18n_message: "admin.news.updateSuccess"})
    end

  end
  def update_news(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # toggle_news_status
  def toggle_news_status(%Plug.Conn{private: %{acs_admin_id: _user_id}} = conn,
                  %{"news_id" => news_id}) do
    case Repo.get(AppNews, news_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.newsNotFound"})
      %AppNews{} = news ->
        AppNews.changeset(news, %{active: !news.active}) |> Repo.update!
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
        {:ok, image_path} = Utils.deploy_image_file(from: image_file_path, to: "news_pics/#{news_id}")
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
      Utils.deploy_image_file_return_size(
        from: image_file_path, 
        to: "news_pics/#{app_id}", 
        low_quality: true)
    conn |> json(%{success: true, link: image_path, width: width, height: height})
  end
  def upload_news_pic(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

end
