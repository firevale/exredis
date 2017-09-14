defmodule Acs.Malls do
  @moduledoc """
  The Malls context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo
  alias Acs.Search

  alias Acs.Malls.Mall
  alias Acs.Malls.MallGoods
  alias Acs.Malls.MallOrder
  alias Acs.Accounts.UserAddress
  alias Acs.Malls.MallOrderLog

  alias Acs.Cache.CachedApp
  alias Acs.Cache.CachedUser
  alias Acs.Cache.CachedMallGoods

  def get_order_info(order_id) do 
    query = 
      from o in MallOrder,
        left_join: details in assoc(o, :details),
        left_join: user in assoc(o, :user),
        left_join: op_logs in assoc(o, :op_logs),
        select: map(o, [:id, :goods_name, :status, :price, :final_price, :address, :currency, :paid_type, :transaction_id, :postage, :inserted_at, :snapshots,
          user: [:id, :nickname, :mobile, :email],
          details: [:id, :goods_name, :goods_pic, :price, :amount, :mall_goods_id],
          op_logs: [:id, :status, :changed_status, :content, :admin_user, :inserted_at] ]),
        where: o.id ==^order_id,
        preload: [user: user, details: details, op_logs: op_logs]

    Repo.one(query)
  end

  def get_mall(mall_id) do
    Repo.get(Mall, mall_id)
  end

  def get_mall_goods(goods_id) do
    Repo.get(MallGoods, goods_id)
  end

  def update_mall_icon(mall, icon_path) do
    Mall.changeset(mall, %{icon: icon_path}) |> Repo.update!
  end

  def update_mall_goods_pic(goods, image_path) do
    MallGoods.changeset(goods, %{pic: image_path}) |> Repo.update!
    CachedMallGoods.refresh(goods)
  end

  def update_mall_goods(user_id, goods) do
    case goods.is_new do
      true ->
        # add new
        count = Repo.one!(from g in MallGoods, select: count(1), where: g.app_id == ^goods.app_id and g.id == ^goods.id)
        if(count > 0) do
          :exist
        else
          goods = goods |> Map.put("user_id", user_id)
          case MallGoods.changeset(%MallGoods{}, goods) |> Repo.insert do
            {:ok, new_goods} ->
              goods = Map.put(goods, "inserted_at", new_goods.inserted_at) |> Map.put("active", false)
              CachedMallGoods.refresh(goods.id)
              Admin.log_admin_operation(user_id, goods.app_id, "update_goods", goods)
              {:add_ok, goods}
            {:error, %{errors: _errors}} ->
              :error
          end
        end

      false ->
        # update
        case Repo.get(MallGoods, goods.id) do
          nil ->
            nil

          %MallGoods{} = mg ->
            goods = Map.put(goods, "user_id", user_id)
            changed = MallGoods.changeset(mg, %{name: goods.name, description: goods.description, pic: goods.pic, price: goods.price, postage: goods.postage, stock: goods.stock})
            changed |> Repo.update!
            CachedMallGoods.refresh(goods.id)
            Admin.log_admin_operation(user_id, goods.app_id, "update_goods", changed.changes)
            {:update_ok, goods}
        end
    end
  end

  def update_mall_info(acs_admin_id, app_id, mall_info) do
    case Repo.get_by(Mall, id: mall_info.id, app_id: app_id) do
      nil ->
        nil

      %Mall{} = mall ->
        changed = Mall.changeset(mall, mall_info)
        changed |> Repo.update!
        CachedApp.refresh(mall.app_id)
        Admin.log_admin_operation(acs_admin_id, app_id, "update_mall_info", changed.changes)
        :ok
    end
  end

  def fetch_malls(app_id) do
    query = from m in Mall,
              order_by: [desc: m.inserted_at],
              where: m.active == true and m.app_id == ^app_id,
              select: map(m, [:id, :title, :active, :icon, :app_id, :inserted_at])

    Repo.all(query)
  end

  def fetch_malls(page, records_per_page) do
    total = Repo.one!(from m in Mall, select: count(1))
    total_page = round(Float.ceil(total / records_per_page))

    query = from m in Mall,
              order_by: [desc: m.inserted_at],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: map(m, [:id, :title, :active, :icon, :app_id, :inserted_at])
    malls = Repo.all(query)

    {:ok, malls, total_page}
  end
  
  def fetch_goods(app_id, page, records_per_page, keyword) do
    {:ok, searchTotal, ids} = search_goods(app_id, keyword, page,records_per_page)

    queryTotal = from g in MallGoods, select: count(1), where: g.app_id == ^app_id
    total = if String.length(keyword)>0 , do: searchTotal, else: Repo.one!(queryTotal)

    if total == 0 do
      :zero
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
      {:ok, goodses, total_page}
    end
  end

  def get_active_goods_paged(app_id, page, records_per_page) do
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
    {:ok, goodses, total_page}
  end 

  def get_goods_stock(goods_id) do
    goods = CachedMallGoods.get(goods_id)
    goods.stock
  end

  def get_mall_detail(app_id) do
    Repo.one!(from m in Mall, select: map(m, [:id, :title, :icon]), where: m.app_id == ^app_id and m.active==true)
  end

  def get_goods_detail(goods_id) do
    add_goods_click(goods_id,1)
    CachedMallGoods.get(goods_id)
  end

  def get_user_addresses(user_id) do
    query = from us in UserAddress,
              where: us.user_id == ^user_id,
              order_by: [desc: us.is_default, desc: us.inserted_at],
              select: map(us, [:id, :name, :mobile, :area, :area_code, :address, :is_default])
    Repo.all(query)
  end
  
  def delete_address(user_id, address_id) do
    case Repo.get(UserAddress, address_id) do
      nil ->
        nil
      %UserAddress{} = address ->
        if(address.is_default)do
          queryTotal = from us in UserAddress, select: count(1), where: us.user_id == ^user_id
          count = Repo.one!(queryTotal)
          if(count <= 1 )do
            case Repo.delete(address) do
              {:ok, _} ->
                :ok
              {:error, %{errors: errors}} ->
                {:error, errors}
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
            :ok
          end
        else 
          case Repo.delete(address) do
              {:ok, _} ->
                :ok
              {:error, %{errors: errors}} ->
                {:error, errors}
            end
        end         
      _ ->
        :badrequest
    end
  end

  def set_default_address(user_id, address_id) do
    queryTotal = from us in UserAddress, select: count(1), where: us.user_id == ^user_id
    case Repo.one!(queryTotal) do
      0 -> :zero
      _ ->
        Repo.transaction(fn ->
          # set all default false
          from(us in UserAddress, where: us.user_id == ^user_id) |> Repo.update_all(set: [is_default: false])
          # set current default true
          from(us in UserAddress, where: us.id == ^address_id) |> Repo.update_all(set: [is_default: true])
        end)
        :ok
    end
  end

  def get_default_address(user_id) do
    query = from ua in UserAddress,
              select: map(ua,[:id, :name, :mobile, :area, :address, :area_code, :is_default]),
              where: ua.user_id == ^user_id and ua.is_default == true

    case address = Repo.one(query) do
      nil -> nil
      _ -> {:ok, address}
    end
  end

  def get_address_detail(address_id) do
    query = from ads in UserAddress,
              select: map(ads,[:id, :name, :mobile, :area, :address, :area_code, :is_default]),
              where: ads.id == ^address_id

    case address = Repo.one!(query) do
      nil -> nil
      _ -> {:ok, address}
    end
  end

  def insert_address(user_id, us_address) do
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
        {:ok, us_address}
      {:error, %{errors: _errors}} ->
        :error
    end
  end

  def update_address(user_id, address) do
    case Repo.get(UserAddress, address.id) do
      nil ->
        nil
      %UserAddress{} = us ->
        if(us.user_id !== user_id)do
          :illegal
        else
          UserAddress.changeset(us, address) |> Repo.update!
          :ok
        end
    end
  end

  def toggle_goods_status(user_id, app_id, goods_id) do
    case Repo.get(MallGoods, goods_id) do
      nil ->
        nil
      %MallGoods{} = goods ->
        MallGoods.changeset(goods, %{active: !goods.active}) |> Repo.update!
        Admin.log_admin_operation(user_id, app_id, "toggle_goods_status", %{"goods_id" => goods_id, "active" => !goods.active})
        :ok
    end
  end

  def delete_goods(user_id, app_id, goods_id, params) do
    case Repo.get(MallGoods, goods_id) do
      nil ->
        nil
      %MallGoods{} = goods ->
        if(goods.sold > 0) do
          :sold
        else
          case Repo.delete(goods) do
            {:ok, _} ->
              CachedMallGoods.del(goods_id)
              Admin.log_admin_operation(user_id, app_id, "delete_goods", params)
              :ok

            {:error, %{errors: errors}} ->
              {:error, errors}
          end
        end
    end
  end

  def update_order_paid(admin_user_id, order_id, transaction_id) do
    order = get_order_info(order_id)
    payed_status = 1
    admin_user = CachedUser.get(admin_user_id)

    if order.status !=0 and order.status != -1 do
      :limit
    else
      result = 
        Repo.transaction(fn ->
          Enum.each(order.details, fn(detail) ->
            goods = Repo.get(MallGoods, detail.mall_goods_id)
            if detail.amount>goods.stock do
              Repo.rollback("admin.mall.order.messages.stockOut")
            else
              MallGoods.changeset(goods, %{stock: goods.stock - detail.amount, sold: goods.sold + detail.amount}) |> Repo.update()
              CachedMallGoods.refresh(goods)
            end
          end)

          from( od in MallOrder, where: od.id == ^order.id) |> Repo.update_all( set: [status: payed_status ,transaction_id: transaction_id])
          MallOrderLog.changeset(%MallOrderLog{},%{ mall_order_id: order_id,  status: order.status, changed_status: payed_status, admin_user: admin_user.email, content: %{ transaction_id: transaction_id} }) |> Repo.insert
        end)

      case result do
        {:error, i18n_message} ->
          {:error, i18n_message}
        _ ->
          Acs.Search.ESMallOrder.update(order_id, transaction_id)
          order = get_order_info(order_id)
          {:ok, order}
      end
    end
  end

  def refund_order(admin_user_id, order_id, refund_money) do
    order = get_order_info(order_id)
    refund_free = refund_money * 100
    admin_user = CachedUser.get(admin_user_id)
    cond do
      refund_free > order.final_price ->
        :out
      order.status !=2 ->
        :limit
      true ->
        cancel_status = -1
        result = 
          Repo.transaction(fn ->
            Enum.each(order.details, fn(detail) ->
              goods = Repo.get(MallGoods, detail.mall_goods_id)
              MallGoods.changeset(goods, %{stock: goods.stock + detail.amount, sold: goods.sold - detail.amount}) |> Repo.update()
              CachedMallGoods.refresh(goods)
            end)

            from(od in MallOrder, where: od.id == ^order.id) |> Repo.update_all(set: [status: cancel_status])
            MallOrderLog.changeset(%MallOrderLog{},%{mall_order_id: order_id, status: order.status, changed_status: cancel_status, admin_user: admin_user.email, content: %{refund_money: refund_free} }) |> Repo.insert
         end)
        case result do
          {:error, i18n_message} ->
            {:error, i18n_message}
          _ ->
            order = Malls.get_order_info(order_id)
            {:ok, order}
        end
    end
  end

  defp search_goods(_app_id, keyword, page, records_per_page) do
    Search.search_mall_goods(keyword, page, records_per_page)
  end

  defp add_goods_click(goods_id, click) do
    goods = Repo.get(MallGoods, goods_id)
    MallGoods.changeset(goods, %{reads: goods.reads+click}) |> Repo.update()
    CachedMallGoods.refresh(goods)
  end

end
