defmodule Acs.NewsController do
  use Acs.Web, :controller

  plug :fetch_session_user_id
  plug :cache_page, [cache_seconds: 600] when action in [:get_paged_news]
  plug :check_forum_manager when action in [:add_news, :delete_news]

  # get_paged_news
  def get_paged_news(conn, %{"app_id" => app_id,
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
              select: map(n, [:id, :title, :is_top, :pic, :reads, :inserted_at])

    news = Repo.all(query)
    conn |> json(%{success: true, news: news, total: total_page, records: total})
  end
  def get_paged_news(conn, _) do
    conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
  end  
  
  # get_news_detail
  def get_news_detail(conn,%{"news_id" => news_id}) do
    query = from n in AppNews,
          join: u in assoc(n, :user),
          where: n.id == ^news_id,
          order_by: [desc: n.id],
          select: map(n, [:id, :title, :content, :is_top, :pic, :reads, :inserted_at,
                          user: [:id, :nickname, :avatar_url]]),
          preload: [user: u]

    news = Repo.one(query)

    add_news_click(news_id, 1)

    conn |> json(%{success: true, news: news})
  end
  def get_news_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
  end
  defp add_news_click(news_id, click) do
    news = Repo.get(AppNews, news_id)
    AppNews.changeset(news, %{reads: news.reads+click}) |> Repo.update()
  end

  # add_news
  def add_news(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, %{
                "app_id" => app_id,
                "title" => title,
                "content" => content,
                "group" => group,
                "is_top" => is_top,
                "pic" => pic} = news) do

      with news = news |> Map.put("user_id", user_id),
        {:ok, new_news} <- AppNews.changeset(%AppNews{}, news) |> Repo.insert
      do
        conn |> json(%{success: true, message: "admin.news.activity.addSuccess"})
      else
        {:error, %{errors: errors}} ->
          conn |> json(%{success: false, message: "admin.error.networkError"})
      end
  end
  def add_news(conn, _) do
    conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
  end

  # delete_news
  def delete_news(%Plug.Conn{private: %{acs_session_user_id: user_id,
                                      acs_is_forum_admin: is_admin}} = conn,
                  %{"news_id" => news_id}) do
    case Repo.get(AppNews, news_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "admin.serverError.newsNotFound"})
      %AppNews{} = news ->
        if(!is_admin) do
          conn |> json(%{success: false, i18n_message: "admin.serverError.illegal"})
        else
          case Repo.delete(news) do
            {:ok, _} ->
              conn |> json(%{success: true, i18n_message: "admin.operateSuccess"})

            {:error, %{errors: errors}} ->
              conn |> json(%{success: false, message: translate_errors(errors)})
          end
        end
    end
  end
  def delete_news(conn, _) do
    conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
  end

  # update_news_pic
  def update_news_pic(conn, %{"news_id" => news_id, "file" => %{} = upload_file}) do
    case Repo.get(AppNews, news_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "admin.serverError.newsNotFound", i18n_message_object: %{news_id: news_id}})

      %AppNews{} = news ->
        case Mogrify.open(upload_file.path) |> Mogrify.verbose do
          %{width: 860, height: 350} = upload_image ->
            if upload_image.format == "png" do
              {md5sum_result, 0} = System.cmd("md5sum", [upload_file.path])
              [file_md5 | _] = String.split(md5sum_result)
              static_path = Application.app_dir(:acs, "priv/static/")
              url_path = "/images/news_pics/"
              {_, 0} = System.cmd("mkdir", ["-p", Path.join(static_path, url_path)])
              {_, 0} = System.cmd("cp", ["-f", upload_file.path, Path.join(static_path, Path.join(url_path, "/#{file_md5}.png"))])
              pic_url = static_url(conn, Path.join(url_path, "/#{file_md5}.png"))
              d "pic_url: #{pic_url}"
              AppNews.changeset(news, %{pic: pic_url}) |> Repo.update!
              #RedisApp.refresh(app_id)
              conn |> json(%{success: true, pic: pic_url})
            else
              conn |> json(%{success: false, i18n_message: "admin.serverError.imageFormatPNG"})
            end
          _ ->
            conn |> json(%{success: false, i18n_message: "admin.serverError.imageSize860x350"})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
    end
  end
  def update_news_pic(conn, _) do
    conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
  end

end
