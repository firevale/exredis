defmodule AcsWeb.MallController do
  use AcsWeb, :controller

  plug :fetch_app_id
  plug :fetch_access_token
  plug :fetch_session_user_id
  plug :fetch_session_user
  # plug :check_forum_manager when action in [:delete_comment, :toggle_post_status]
  plug :cache_page, [cache_seconds: 10] when action in [:fetch_malls, :get_active_goods_paged]
  # plug :cache_page, [cache_seconds: 600] when action in [:get_forum_info, :get_paged_forums]
  plug :check_is_admin when action in [:update_goods, :update_goods_pic, :toggle_goods_status, :delete_goods]

  # fetch_malls
  def fetch_malls(conn, %{"page" => page, "records_per_page" => records_per_page}) do
    fetch_malls(conn, page, records_per_page)
  end
  def fetch_malls(conn, %{"app_id" => app_id}) do
    query = from m in Mall,
              order_by: [desc: m.inserted_at],
              where: m.active == true and m.app_id == ^app_id,
              select: map(m, [:id, :title, :active, :icon, :app_id, :inserted_at])

    malls = Repo.all(query)
    conn |> json(%{success: true, malls: malls})
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
  plug :check_upload_image, [
    param_name: "file", 
    square: true,
    min_width: 128,
    format: "png",
    resize_to_limit: [width: 128, height: 128]] when action == :update_mall_icon
  def update_mall_icon(conn, %{"mall_id" => mall_id, "file" => %{path: image_file_path}}) do
    case Repo.get(Mall, mall_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.mallNotFound", i18n_message_object: %{mall_id: mall_id}})

      %Mall{} = mall ->
        {:ok, icon_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "mall_icons")
        Mall.changeset(mall, %{icon: icon_path}) |> Repo.update!
        conn |> json(%{success: true, icon_url: icon_path})
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end

  # update_mall_info
  def update_mall_info(%Plug.Conn{private: %{acs_admin_id: acs_admin_id, acs_app_id: app_id}} = conn, 
                                %{"mall" => %{"id" => mall_id} = mall_info}) do
    case Repo.get_by(Mall, id: mall_id, app_id: app_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.mallNotFound"})

      %Mall{} = mall ->
        changed = Mall.changeset(mall, mall_info)
        changed |> Repo.update!
        CachedApp.refresh(mall.app_id)
        AdminController.add_operate_log(acs_admin_id, app_id, "update_mall_info", changed.changes)
        conn |> json(%{success: true, i18n_message: "admin.serverSuccess.mallUpdated"})
    end
  end

  # fetch_goods
  def fetch_goods(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"page" => page, "records_per_page" => records_per_page,
   "keyword" => keyword}) do

    {:ok,searchTotal,ids} =search_goods(app_id, keyword,page,records_per_page)

    queryTotal = from g in MallGoods, select: count(1), where: g.app_id == ^app_id
    total = if String.length(keyword)>0 , do: searchTotal, else: Repo.one!(queryTotal)

    if total == 0 do
      conn |> json(%{success: true, total: 0, goodses: []})
    else
        total_page = round(Float.ceil(total / records_per_page))
        query = from g in MallGoods,
              where: g.app_id == ^app_id,
              order_by: [desc: g.inserted_at],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: map(g, [:id, :name, :currency, :pic, :price, :postage, :stock, :sold, :active])

        query = if(String.length(keyword)>0) do
          query |> where([p], p.id in ^ids)
        else
          query
        end

         goodses = Repo.all(query)
         conn |> json(%{success: true, goodses: goodses, total: total_page})
    end
  end
  def fetch_goods(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  defp search_goods(_app_id, keyword, page, records_per_page) do
    if String.length(keyword)>0 do
          query = %{
            query: %{
              bool: %{
                should: [
                  %{term: %{id: keyword}},
                  %{term: %{app_id: keyword}},
                  %{match: %{name: keyword}},
                  %{match: %{description: keyword}},
                ],
                minimum_should_match: 1,
                boost: 1.0,
              },
            },
            sort: %{inserted_at: %{order: :desc}},
            from: (page - 1) * records_per_page,
            size: records_per_page,
          }

          case Elasticsearch.search(%{index: "mall", type: "goods", query: query, params: %{timeout: "1m"}}) do
            {:ok, %{hits: %{hits: hits, total: total}}} ->
              ids = Enum.map(hits, &(&1._id))
              {:ok, total, ids }
            error ->
             throw(error)
          end
        else
          {:ok,0, {}}
        end
  end

  # update_goods_pic
  plug :check_upload_image, [
    param_name: "file", 
    square: true,
    format: ["png", "jpeg", "jpg"],
    reformat: "jpg"] when action == :update_goods_pic
  def update_goods_pic(%Plug.Conn{private: %{acs_admin_id: acs_admin_id, acs_app_id: app_id}} = conn, 
                      %{"goods_id" => goods_id, "file" => %{path: image_file_path}}) do
   case Repo.get(MallGoods, goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound", i18n_message_object: %{goods_id: goods_id}})

      %MallGoods{} = goods ->
        {:ok, image_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "goods_icon/#{goods_id}")
        MallGoods.changeset(goods, %{pic: image_path}) |> Repo.update!
        CachedMallGoods.refresh(goods)
        AdminController.add_operate_log(acs_admin_id, app_id, "update_goods_pic", %{pic: image_path})
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
    {:ok, image_path} = DeployUploadedFile.deploy_image_file(from: image_file_path, to: "goods_pics/#{goods_id}")
    conn |> json(%{success: true, link: image_path})
  end

  # update_goods
  def update_goods(%Plug.Conn{private: %{acs_admin_id: user_id}} = conn, %{
                "id" => id,
                "app_id" => app_id,
                "name" => name,
                "pic" => pic,
                "description" => description,
                "price" => price,
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
              goods = Map.put(goods, "inserted_at", new_goods.inserted_at) |> Map.put("active", false)
              CachedMallGoods.refresh(id)
              AdminController.add_operate_log(user_id, app_id, "update_goods", goods)
              conn |> json(%{success: true, goods: goods, i18n_message: "admin.mall.addSuccess"})
            {:error, %{errors: _errors}} ->
              conn |> json(%{success: false, i18n_message: "error.server.networkError"})
          end
        end

      false ->
        # update
        case Repo.get(MallGoods, id) do
          nil ->
            conn |> json(%{success: false, i18n_message: "admin.mall.notExist"})

          %MallGoods{} = mg ->
            goods = Map.put(goods, "user_id", user_id)
            changed = MallGoods.changeset(mg, %{name: name, description: description, pic: pic, price: price, postage: postage, stock: stock})
            changed |> Repo.update!
            CachedMallGoods.refresh(id)
            AdminController.add_operate_log(user_id, app_id, "update_goods", changed.changes)
            conn |> json(%{success: true, goods: goods, i18n_message: "admin.mall.updateSuccess"})
        end
    end
  end
  def update_goods(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # toggle_goods_status
  def toggle_goods_status(%Plug.Conn{private: %{acs_admin_id: user_id, acs_app_id: app_id}} = conn,
                  %{"goods_id" => goods_id}) do
    case Repo.get(MallGoods, goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound"})
      %MallGoods{} = goods ->
        MallGoods.changeset(goods, %{active: !goods.active}) |> Repo.update!
        AdminController.add_operate_log(user_id, app_id, "toggle_goods_status", %{"goods_id" => goods_id, "active" => !goods.active})
        conn |> json(%{success: true, i18n_message: "admin.operateSuccess"})
    end
  end
  def toggle_goods_status(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # delete_goods
  def delete_goods(%Plug.Conn{private: %{acs_admin_id: user_id, acs_app_id: app_id}} = conn,
                     %{"goods_id" => goods_id} = params) do
    case Repo.get(MallGoods, goods_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound"})
      %MallGoods{} = goods ->
        if(goods.sold > 0) do
          conn |> json(%{success: false, i18n_message: "admin.mall.soldCanNotDelete"})
        else
          case Repo.delete(goods) do
            {:ok, _} ->
              CachedMallGoods.del(goods_id)
              AdminController.add_operate_log(user_id, app_id, "delete_goods", params)
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
              select: map(g, [:id, :name, :currency, :pic, :price, :postage, :stock, :description])

    goodses = Repo.all(query)
    conn |> json(%{success: true, goodses: goodses, total: total_page})
  end

  def get_goods_stock(conn,%{"goods_id" => goods_id})do
    goods = CachedMallGoods.get(goods_id)
    conn |> json(%{success: true, stock: goods.stock})
  end
  def get_goods_stock(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def get_mall_detail(conn,%{"app_id" => app_id})do
    mall= Repo.one!(from m in Mall, select: map(m, [:id, :title, :icon]), where: m.app_id == ^app_id and m.active==true )
    conn |> json(%{success: true, mall: mall})
  end
  def get_mall_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def get_goods_detail(conn,%{"goods_id" =>goods_id})do
    goods = CachedMallGoods.get(goods_id)
    add_goods_click(goods_id,1)
    conn |> json(%{success: true, goods: goods})
  end
  def get_goods_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  defp add_goods_click(goods_id, click) do
    goods = Repo.get(MallGoods, goods_id)
    MallGoods.changeset(goods, %{reads: goods.reads+click}) |> Repo.update()
    CachedMallGoods.refresh(goods)
  end

  def get_user_addresses(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,_)do
    query = from us in UserAddress,
              where: us.user_id == ^user_id,
              order_by: [desc: us.is_default, desc: us.inserted_at],
              select: map(us, [:id, :name, :mobile, :area, :area_code, :address, :is_default])

    addresses = Repo.all(query)
    conn |> json(%{success: true, addresses: addresses})
  end
  def get_user_addresses(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def delete_address(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,%{"address_id" => address_id}) do
    case Repo.get(UserAddress, address_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.addressNotFound"})
      %UserAddress{} = address ->
        if(address.is_default)do
          queryTotal = from us in UserAddress, select: count(1), where: us.user_id == ^user_id
          count = Repo.one!(queryTotal)
          if(count <= 1 )do
            case Repo.delete(address) do
              {:ok, _} ->
                conn |> json(%{success: true, i18n_message: "mall.address.deleteSuccess"})
              {:error, %{errors: errors}} ->
                conn |> json(%{success: false, message: translate_errors(errors)})
            end          
          else
            queryLast = from us in UserAddress, 
                        where: us.user_id == ^user_id and us.id != ^address_id,
                        order_by: [desc: us.inserted_at],  
                        limit: 1,
                        select: map(us, [:id])
            lastAddress = Repo.one(queryLast)

            Repo.transaction(fn ->
            from(us in UserAddress, where: us.id == ^address_id) |> Repo.delete_all

            from(us in UserAddress, 
                where: us.id == ^lastAddress.id) 
            |> Repo.update_all(set: [is_default: true])
            end)
            conn |>json(%{success: true, i18n_message: "mall.address.deleteSuccess"})
          end
        else 
          case Repo.delete(address) do
              {:ok, _} ->
                conn |> json(%{success: true, i18n_message: "mall.address.deleteSuccess"})
              {:error, %{errors: errors}} ->
                conn |> json(%{success: false, message: translate_errors(errors)})
            end
        end         
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end
  def delete_address(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def set_default_address(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,%{"address_id" => address_id})do
    queryTotal = from us in UserAddress, select: count(1), where: us.user_id == ^user_id
    case Repo.one!(queryTotal) do
      0 ->
        conn |> json(%{success: false, i18n_message: "error.server.addressNotFound"})
      _ ->
          Repo.transaction(fn ->
            # set all default false
            from(us in UserAddress, where: us.user_id == ^user_id) |> Repo.update_all(set: [is_default: false])

            # set current default true
            from(us in UserAddress, where: us.id == ^address_id) |> Repo.update_all(set: [is_default: true])
          end)
          conn |>json(%{success: true, i18n_message: "mall.address.setDefaultSuccess"})
    end
  end
  def set_default_address(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def get_default_address(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, _) do
    query = from ua in UserAddress,
            select: map(ua,[:id, :name, :mobile, :area, :address, :area_code, :is_default]),
            where: ua.user_id == ^user_id and ua.is_default == true

    case address = Repo.one(query) do
      nil ->
        conn |> json(%{success: false})
      _ ->
        conn |> json(%{success: true, address: address})
    end
  end
  def get_default_address(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def get_address_detail(%Plug.Conn{private: %{acs_session_user_id: _user_id}} = conn,%{"address_id" => address_id}) do
    query = from ads in UserAddress,
            select: map(ads,[:id, :name, :mobile, :area, :address, :area_code, :is_default]),
            where: ads.id == ^address_id

    case address = Repo.one!(query) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.addressNotFound"})
      _ ->
          conn |> json(%{success: true, address: address})
    end
  end
  def get_address_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  def insert_address(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, %{
                "name" => _name,
                "mobile" => _mobile,
                "area" => _area,
                "address" => _address,
                "area_code" => _area_code} = us_address)do
    us_address = us_address |> Map.put("user_id", user_id)
    queryCount = from us in UserAddress,select: count(1), where: us.user_id == ^user_id
    count = Repo.one!(queryCount)
    us_address = case count do
      0 -> us_address |> Map.put("is_default",true)
      _ -> us_address
    end

    case UserAddress.changeset(%UserAddress{}, us_address) |> Repo.insert do
        {:ok, new_address} ->
          us_address = us_address |> Map.put("id", new_address.id)
          conn |> json(%{success: true, address: us_address, i18n_message: "mall.address.addSuccess"})
        {:error, %{errors: _errors}} ->
          conn |> json(%{success: false, i18n_message: "error.server.networkError"})
    end
  end
  def insert_address(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  def update_address(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, %{
                "id" => id,
                "name" => name,
                "mobile" => mobile,
                "area" => area,
                "address" => address,
                "area_code" => area_code,
                "is_default" => is_default})do

    case Repo.get(UserAddress, id) do
        nil ->
          conn |> json(%{success: false, i18n_message: "error.server.addressNotFound"})

        %UserAddress{} = us ->
          if(us.user_id !== user_id)do
            conn |> json(%{success: false, i18n_message: "error.server.illegal"})
          else
            UserAddress.changeset(us, %{name: name, mobile: mobile, area: area, address: address, area_code: area_code, is_default: is_default}) |> Repo.update!
            conn |> json(%{success: true, i18n_message: "mall.address.updateSuccess"})
          end
      end
  end
  def update_address(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
end
