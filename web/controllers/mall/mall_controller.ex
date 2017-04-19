defmodule Acs.MallController do
  use Acs.Web, :controller

  # alias   Acs.RedisMall
  require Floki

  plug :fetch_app_id
  plug :fetch_access_token
  plug :fetch_session_user_id
  plug :fetch_session_user
  # plug :check_forum_manager when action in [:delete_comment, :toggle_post_status]
  # plug :cache_page, [cache_seconds: 10] when action in [:get_paged_post, :get_post_comments, :get_post_detail]
  # plug :cache_page, [cache_seconds: 600] when action in [:get_forum_info, :get_paged_forums]
  plug :check_is_admin when action in [:update_goods, :update_goods_pic, :toggle_goods_status, :delete_goods]

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
              select: map(m, [:id, :title, :active, :icon, :app_id, :inserted_at])

    malls = Repo.all(query)
    conn |> json(%{success: true, malls: malls, total: total_page})
  end

  # update_mall_icon
  def update_mall_icon(conn, %{"mall_id" => mall_id, "file" => %{} = upload_file}) do
    case Repo.get(Mall, mall_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.mallNotFound", i18n_message_object: %{mall_id: mall_id}})

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
              conn |> json(%{success: false, i18n_message: "error.server.imageFormatPNG"})
            end
          _ ->
            conn |> json(%{success: false, i18n_message: "error.server.imageSize128x128"})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end

  # update_mall_info
  def update_mall_info(conn, %{"mall" => %{"id" => mall_id} = mall_info}) do
    case Repo.get(Mall, mall_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.mallNotFound"})

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
    
    if(String.length(keyword) > 0) do
      keyword =  "%" <> keyword <> "%" 
    end

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
              select: map(g, [:id, :name, :currency, :pic, :price, :postage, :stock, :sold, :active])

    query = if(String.length(keyword)>0) do
      query |> where([p], like(p.name, ^keyword))
    else
      query
    end

    goodses = Repo.all(query)
    conn |> json(%{success: true, goodses: goodses, total: total_page})
  end
  def fetch_goods(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # update_goods_pic
  def update_goods_pic(conn, %{"goods_id" => goods_id, "file" => %{} = upload_file}) do
   case Repo.get(MallGoods, goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound", i18n_message_object: %{goods_id: goods_id}})

      %MallGoods{} = goods ->
        case Mogrify.open(upload_file.path) |> Mogrify.verbose do
          %{width: 400, height: 400} = upload_image ->
            if upload_image.format in ["jpg", "jpeg", "png"] do
              {md5sum_result, 0} = System.cmd("md5sum", [upload_file.path])
              [file_md5 | _] = String.split(md5sum_result)
              static_path = Application.app_dir(:acs, "priv/static/")
              url_path = "/images/goods_icon/#{goods_id}"
              {_, 0} = System.cmd("mkdir", ["-p", Path.join(static_path, url_path)])
              {_, 0} = System.cmd("cp", ["-f", upload_file.path, Path.join(static_path, Path.join(url_path, "/#{file_md5}.#{upload_image.format}"))])
              pic_url = static_url(conn, Path.join(url_path, "/#{file_md5}.#{upload_image.format}"))

              MallGoods.changeset(goods, %{pic: pic_url}) |> Repo.update!

              conn |> json(%{success: true, pic_url: pic_url})
            else
              conn |> json(%{success: false, i18n_message: "error.server.invalidImageFormat"})
            end
          _ ->
            conn |> json(%{success: false, i18n_message: "error.server.imageSize400x400"})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end
  def update_goods_content_pic(conn, %{"goods_id" => goods_id, "file" => %{} = upload_file}) do
    upload_image = Mogrify.open(upload_file.path) |> Mogrify.verbose 
    if upload_image.format in ["jpg", "jpeg", "png"] do
      {md5sum_result, 0} = System.cmd("md5sum", [upload_file.path])
      [file_md5 | _] = String.split(md5sum_result)
      static_path = Application.app_dir(:acs, "priv/static/")
      url_path = "/images/goods_pics/#{goods_id}"
      {_, 0} = System.cmd("mkdir", ["-p", Path.join(static_path, url_path)])
      {_, 0} = System.cmd("cp", ["-f", upload_file.path, Path.join(static_path, Path.join(url_path, "/#{file_md5}.#{upload_image.format}"))])
      conn |> json(%{success: true, link: static_url(conn, Path.join(url_path, "/#{file_md5}.#{upload_image.format}"))})
    else
      conn |> json(%{success: false, i18n_message: "error.server.invalidImageFormat"})
    end
  end
  def update_goods_pic(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # update_goods
  def update_goods(%Plug.Conn{private: %{acs_admin_id: user_id}} = conn, %{
                "id" => id,
                "app_id" => app_id,
                "name" => name,
                "pic" => pic,
                "description" => description,
                "price" => price,
                "currency" => currency,
                "postage" => postage,
                "stock" => stock,
                "is_new" => is_new} = goods) do
    case is_new do
      true ->
        # add new
        count = Repo.one!(from g in MallGoods, select: count(1), where: g.app_id == ^app_id and g.id == ^id)
        if(count > 0) do
          conn |> json(%{success: false, i18n_message: "admin.mall.sameGoodsIdExist"})
        else
          goods = goods |> Map.put("user_id", user_id)
          case MallGoods.changeset(%MallGoods{}, goods) |> Repo.insert do
            {:ok, new_goods} ->
              goods = goods |> Map.put("inserted_at", new_goods.inserted_at) |> Map.put("active", false)
              conn |> json(%{success: true, goods: goods, i18n_message: "admin.mall.addSuccess"})
            {:error, %{errors: errors}} ->
              conn |> json(%{success: false, i18n_message: "error.server.networkError"})
          end
        end

      false -> 
        # update 
        case Repo.get(MallGoods, id) do
          nil -> 
            conn |> json(%{success: false, i18n_message: "admin.mall.notExist"})

          %MallGoods{} = mg ->
            goods = goods |> Map.put("user_id", user_id)
            MallGoods.changeset(mg, %{name: name, description: description, pic: pic, price: price, postage: postage, stock: stock}) |> Repo.update!
            conn |> json(%{success: true, goods: goods, i18n_message: "admin.mall.updateSuccess"})
        end
    end
  end
  def update_goods(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # toggle_goods_status
  def toggle_goods_status(%Plug.Conn{private: %{acs_admin_id: _user_id}} = conn,
                  %{"goods_id" => goods_id}) do
    case Repo.get(MallGoods, goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound"})
      %MallGoods{} = goods ->
        MallGoods.changeset(goods, %{active: !goods.active}) |> Repo.update!
        conn |> json(%{success: true, i18n_message: "admin.operateSuccess"})
    end
  end
  def toggle_goods_status(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # delete_goods
  def delete_goods(%Plug.Conn{private: %{acs_admin_id: _user_id}} = conn,
                     %{"goods_id" => goods_id}) do
    case Repo.get(MallGoods, goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound"})
      %MallGoods{} = goods ->
        if(goods.sold > 0) do
          conn |> json(%{success: false, i18n_message: "admin.mall.soldCanNotDelete"})
        else
          case Repo.delete(goods) do
            {:ok, _} ->
              conn |> json(%{success: true, i18n_message: "admin.operateSuccess"})

            {:error, %{errors: errors}} ->
              conn |> json(%{success: false, message: translate_errors(errors)})
          end
        end
    end
  end
  def delete_goods(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
 
 #  show active_mall_goods
 def get_active_goods_paged(conn, %{"page" => page, 
                        "records_per_page" => records_per_page,
                        "app_id" => app_id}) do    

    queryTotal = from g in MallGoods, select: count(1), where: g.app_id == ^app_id and g.active==true

    total = Repo.one!(queryTotal)
    total_page = round(Float.ceil(total / records_per_page))

    query = from g in MallGoods,
              where: g.app_id == ^app_id and g.active==true,
              order_by: [desc: g.inserted_at],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: map(g, [:id, :name, :currency, :pic, :price, :postage, :stock, :sold])

    goodses = Repo.all(query)
    conn |> json(%{success: true, goodses: goodses, total: total_page})
  end

  def get_goods_stock(conn,%{"goods_id" => goods_id})do
    case Repo.one(from g in MallGoods, select: map(g, [:stock]), where: g.id == ^goods_id and g.active == true) do
      %MallGoods{} = goods ->
        conn |> json(%{success: true, stock: goods.stock})
      _ ->
        conn |> json(%{success: true, stock: 0}) 
    end
  end
  def get_goods_stock(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def get_mall_detail(conn,%{"app_id" =>app_id})do
    mall= Repo.one!(from m in Mall, select: map(m, [:id, :title, :icon]), where: m.app_id == ^app_id and m.active==true )
    conn |> json(%{success: true, mall: mall})
  end
  def get_mall_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def get_goods_detail(conn,%{"goods_id" =>goods_id})do
    goods = Repo.one(from g in MallGoods, select: map(g, [:id, :app_id, :currency, :name, :description, :price, :postage, :pic, :stock, :sold, :active]), where: g.id == ^goods_id)
    add_goods_click(goods_id,1)
    conn |> json(%{success: true, goods: goods})
  end
  def get_goods_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  defp add_goods_click(goods_id, click) do
    goods = Repo.get(MallGoods, goods_id)
    MallGoods.changeset(goods, %{reads: goods.reads+click}) |> Repo.update()
  end
  
end
