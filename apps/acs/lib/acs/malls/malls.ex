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
  alias Acs.Malls.MallOrderLog
  alias Acs.Malls.MallOrderDetail

  alias Acs.Cache.CachedMall
  alias Acs.Cache.CachedApp
  alias Acs.Cache.CachedUser
  alias Acs.Cache.CachedMallGoods

  def get_mall_order(order_id) do 
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
    CachedMall.get(mall_id)
  end

  def get_app_mall(app_id) do 
    CachedMall.get_by(app_id: app_id)
  end

  def update_mall!(mall_info) do
    case CachedMall.get(mall_info.id) do
      nil ->
        nil

      %Mall{} = mall ->
        {:ok, _, changeset} = update_mall!(mall, mall_info)
        {:ok, changeset.changes}
    end
  end

  def create_mall!(mall_id, title, app_id) do 
    changed = Mall.changeset(%{}, %{
      id: mall_id,
      title: title, 
      active: true,
      app_id: app_id
    })
    new_mall = changed |> Repo.insert!
    CachedApp.refresh(new_mall)
    {:ok, new_mall}
  end

  def update_mall!(%Mall{} = mall, attr) do 
    changed = Mall.changeset(mall, attr)
    new_mall = changed |> Repo.update!
    CachedMall.refresh(new_mall)
    {:ok, new_mall, changed}
  end

  def get_mall_goods(goods_id) do
    CachedMallGoods.get(goods_id)
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
            {:update_ok, goods, changed.changes}
        end
    end
  end

  def update_mall_goods(%MallGoods{}, attr) do 

  end



  def list_malls(app_id) do
    query = from m in Mall,
              order_by: [desc: m.inserted_at],
              where: m.active == true and m.app_id == ^app_id,
              select: map(m, [:id, :title, :active, :icon, :app_id, :inserted_at])

    Repo.all(query)
  end

  def list_malls(page, records_per_page) do
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
  
  def list_mall_goods(app_id, page, records_per_page, keyword) do
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

  def get_mall_goods_detail(goods_id) do
    add_goods_click(goods_id,1)
    CachedMallGoods.get(goods_id)
  end

  def toggle_goods_status(goods_id) do
    case Repo.get(MallGoods, goods_id) do
      nil ->
        nil
      %MallGoods{} = goods ->
        MallGoods.changeset(goods, %{active: !goods.active}) |> Repo.update!
        {:ok, !goods.active}
    end
  end

  def delete_mall_goods(goods_id) do
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
              :ok

            {:error, %{errors: errors}} ->
              {:error, errors}
          end
        end
    end
  end

  def set_mall_order_paid(admin_user_id, order_id, transaction_id) do
    order = get_mall_order(order_id)
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
          order = get_mall_order(order_id)
          {:ok, order}
      end
    end
  end

  def refund_order(admin_user_id, order_id, refund_money) do
    order = get_mall_order(order_id)
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
            order = get_mall_order(order_id)
            {:ok, order}
        end
    end
  end

  def list_mall_orders(app_id, keyword, page, records_per_page) do
    {:ok, searchTotal, ids} = 
      Acs.Search.search_mall_orders(keyword: keyword, app_id: app_id, page: page, records_per_page: records_per_page)

    queryTotal = from o in MallOrder, select: count(1), where: o.app_id == ^app_id
    total = if String.length(keyword)>0 , do: searchTotal, else: Repo.one!(queryTotal)

    if total == 0 do
      :zero
    else
      total_page = round(Float.ceil(total / records_per_page))
      query = 
        from order in MallOrder,
          left_join: details in assoc(order, :details),
          left_join: user in assoc(order, :user),
          select: map(order, [:id, :goods_name, :status, :price, :final_price, :currency, :postage, :inserted_at,
            user: [:id, :nickname, :mobile],
            details: [:id, :goods_name, :goods_pic, :price, :amount] ]),
          where: order.app_id == ^app_id,
          order_by: [desc: order.inserted_at],
          limit: ^records_per_page,
          offset: ^((page - 1) * records_per_page),
          preload: [user: user, details: details]

        query =
          if(String.length(keyword)>0) do
            where(query, [o], o.id in ^ids)
          else
            query
          end

      orders = Repo.all(query)
      {:ok, orders, total_page}
    end
  end

  def create_mall_order(user_id, platform, device_id, ip_address, order) do
    with %MallGoods{} = goods <- Repo.get(MallGoods, order.goods_id),
      order_id <- create_order_id(user_id, order.pay_type)
    do
      final_price = goods.price * order.quantity + goods.postage
      if(order.quantity <= 0 or final_price < 0) do
        :badrequest
      else
        if(goods.stock == 0 or goods.stock < order.quantity) do
          :stockout
        else
          Repo.transaction(fn ->
            # goods stock
            MallGoods.changeset(goods, %{stock: goods.stock - order.quantity, sold: goods.sold + order.quantity}) |> Repo.update()
            CachedMallGoods.refresh(goods)

            # add order
            mapGoods= Map.from_struct(goods) |> Map.drop([:__meta__, :app, :user])
            snapshots = Map.put(%{}, order.goods_id, mapGoods)
            new_order = %{"id": order_id, "platform": platform, "device_id": device_id, "user_ip": ip_address,
                        "goods_name": goods.name, "price": goods.price, "postage": goods.postage,
                        "discount": 0, "final_price": final_price, "currency": goods.currency, "paid_type": order.pay_type,
                        "app_id": goods.app_id, "user_id": user_id, "address": order.address, "snapshots": snapshots}

            {:ok, _mall_order} = MallOrder.changeset(%MallOrder{}, new_order) |> Repo.insert

            # add order detail
            order_detail = %{"goods_name": goods.name, "goods_pic": goods.pic, "price": goods.price,
                          "amount": order.quantity, "mall_goods_id": goods.id, "mall_order_id": order_id}

            {:ok, _mall_order_detail} = MallOrderDetail.changeset(%MallOrderDetail{}, order_detail) |> Repo.insert
          end)
          {:ok, order_id}
        end
      end
    else
      nil ->
        :illegal
    end
  end

  def fetch_my_orders(type, _user_id, page, records_per_page) do
    total = Repo.one!(from order in MallOrder, select: count(1))
    total_page = round(Float.ceil(total / records_per_page))

    query = 
      from order in MallOrder,
        left_join: details in assoc(order, :details),
        left_join: user in assoc(order, :user),
        select: map(order, [:id, :goods_name, :status, :price, :final_price, :currency, :snapshots, :postage, :inserted_at, :address,
          user: [:id, :nickname, :mobile],
          details: [:id, :goods_name, :goods_pic, :price, :amount, :mall_goods_id] ]),
        order_by: [desc: order.inserted_at],
        limit: ^records_per_page,
        offset: ^((page - 1) * records_per_page),
        preload: [user: user, details: details]

      query =
        case type  do
          "waitPay" ->
            where(query, [o], o.status == 0)
          "waitConfirm" ->
            where(query, [o], o.status in [1,2])
          _ ->
            query
        end
    orders = Repo.all(query)
    {:ok, orders, total_page}
  end

  def confirm_recieved(user_id, order_id) do
    order = Repo.get!(MallOrder, order_id)
    cond  do
      not order.status in [1,2]  ->
        :received
      order.user_id != user_id ->
        :illegal
      true ->
        finish_status = 4
        from( od in MallOrder, where: od.id == ^order.id) |> Repo.update_all( set: [status: finish_status])
        new_order = Map.put(order, :status, finish_status)
        {:ok, new_order}
    end
  end 

  def cancel_mall_order() do
    now = DateTime.utc_now()
    query = from order in MallOrder,
              select: order,
              where: order.status == 0 and
                order.inserted_at <= ago(20, "minute")

      Repo.all(query) |> Enum.each(fn(order) ->
        MallOrder.changeset(order, %{status: -1, close_at: now, memo: "auto close over 20 minutes"}) |> Repo.update()
        rollback_goods_stock(order.id)
    end)
  end

  def finish_mall_order() do
    now = DateTime.utc_now()
    query = from order in MallOrder,
              select: order,
              where: order.status == 1 and
                order.inserted_at <= ago(15, "day")

      Repo.all(query) |> Enum.each(fn(order) ->
        MallOrder.changeset(order, %{status: 4, confirm_at: now, memo: "auto finish over 15 days"}) |> Repo.update()
    end)
  end

  defp search_goods(_app_id, keyword, page, records_per_page) do
    Search.search_mall_goods(keyword, page, records_per_page)
  end

  defp add_goods_click(goods_id, click) do
    goods = Repo.get(MallGoods, goods_id)
    MallGoods.changeset(goods, %{reads: goods.reads+click}) |> Repo.update()
    CachedMallGoods.refresh(goods)
  end

  defp create_order_id(user_id, pay_type) do
    order_id = Integer.to_string(Utils.unix_timestamp) <> String.slice(Integer.to_string(user_id), -4, 4)
    order_id = 
      case pay_type do
        "wechat" -> "w" <> order_id
        "alipay" -> "a" <> order_id
      end
    order_id
  end

  defp rollback_goods_stock(order_id) do
    query = from od in MallOrderDetail,
                  select: od,
                  where: od.mall_order_id == ^order_id
    Repo.all(query) |> Enum.each(fn(detail) ->
      goods = CachedMallGoods.get(detail.mall_goods_id) 
      MallGoods.changeset(goods, %{stock: goods.stock + detail.amount, sold: goods.sold - detail.amount}) |> Repo.update()
      CachedMallGoods.refresh(goods)
    end)
  end

end
