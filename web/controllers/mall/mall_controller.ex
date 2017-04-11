defmodule Acs.MallController do
  use Acs.Web, :controller

  # alias   Acs.RedisMall
  require Floki

  plug :fetch_app_id
  plug :fetch_session_user_id  
  plug :fetch_session_user
  # plug :check_forum_manager when action in [:delete_comment, :toggle_post_status]
  # plug :cache_page, [cache_seconds: 10] when action in [:get_paged_post, :get_post_comments, :get_post_detail]
  # plug :cache_page, [cache_seconds: 600] when action in [:get_forum_info, :get_paged_forums]

  # fetch_malls
  def fetch_malls(conn, %{"page" => page, "records_per_page" => records_per_page}) do
    fetch_malls(conn, page, records_per_page)
  end
  def fetch_malls(conn, _params) do
    fetch_malls(conn, 1, 100)
  end
  defp fetch_malls(conn, page, records_per_page) do
    total = Repo.one!(from m in Mall, select: count(1))
    total_page = round(Float.ceil(total / records_per_page))

    query = from m in Mall,
              order_by: [desc: m.inserted_at],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: map(m, [:id, :title, :icon, :app_id, :inserted_at])

    malls = Repo.all(query)
    conn |> json(%{success: true, malls: malls, total: total_page})
  end

  # update_mall_icon
  def update_mall_icon(conn, %{"mall_id" => mall_id, "file" => %{} = upload_file}) do
    case Repo.get(Mall, mall_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "admin.serverError.mallNotFound", i18n_message_object: %{mall_id: mall_id}})

      %Mall{} = mall ->
        case Mogrify.open(upload_file.path) |> Mogrify.verbose do
          %{width: 128, height: 128} = upload_image ->
            if upload_image.format == "png" do
              {md5sum_result, 0} = System.cmd("md5sum", [upload_file.path])
              [file_md5 | _] = String.split(md5sum_result)
              static_path = Application.app_dir(:acs, "priv/static/")
              url_path = "/images/mall_icons/"
              {_, 0} = System.cmd("mkdir", ["-p", Path.join(static_path, url_path)])
              {_, 0} = System.cmd("cp", ["-f", upload_file.path, Path.join(static_path, Path.join(url_path, "/#{file_md5}.png"))])
              icon_url = static_url(conn, Path.join(url_path, "/#{file_md5}.png"))
              d "icon_url: #{icon_url}"
              Mall.changeset(mall, %{icon: icon_url}) |> Repo.update!
              #RedisApp.refresh(app_id)
              conn |> json(%{success: true, icon_url: icon_url})
            else
              conn |> json(%{success: false, i18n_message: "admin.serverError.imageFormatPNG"})
            end
          _ ->
            conn |> json(%{success: false, i18n_message: "admin.serverError.imageSize128x128"})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
    end
  end

  # update_mall_info
  def update_mall_info(conn, %{"mall" => %{"id" => mall_id} = mall_info}) do
    case Repo.get(Mall, mall_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "admin.serverError.mallNotFound"})

      %Mall{} = mall ->
        Mall.changeset(mall, mall_info) |> Repo.update!
        conn |> json(%{success: true, i18n_message: "admin.serverSuccess.mallUpdated"})
    end
  end

  # fetch_goods
  def fetch_goods(conn, %{"page" => page, 
                        "records_per_page" => records_per_page,
                        "keyword" => keyword,
                        "app_id" => app_id}) do
    
    # if(String.length(keyword)>0) do

    queryTotal = from g in MallGoods, select: count(1), where: g.app_id == ^app_id
    queryTotal = if(String.length(keyword)>0) do
      queryTotal |> where([p], like(p.name, ^keyword))
    else
      queryTotal
    end

    total = Repo.one!(queryTotal)
    total_page = round(Float.ceil(total / records_per_page))

    query = from g in MallGoods,
              where: g.app_id == ^app_id,
              order_by: [desc: g.inserted_at],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: map(g, [:id, :name, :pic, :price, :postage, :stock, :sold])

    query = if(String.length(keyword)>0) do

      query |> where([p], like(p.name, ^keyword))
    else
      query
    end

    goodses = Repo.all(query)
    conn |> json(%{success: true, goodses: goodses, total: total_page})
  end
  def fetch_malls(conn, _params) do
    conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
  end
 
end
