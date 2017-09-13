defmodule AcsWeb.MallOrderController do
  use AcsWeb, :controller

  alias Acs.Malls

  plug :fetch_app_id
  plug :fetch_access_token
  plug :fetch_session_user_id
  plug :fetch_session_user
  plug :fetch_device_id

  # fetch_malls
  def fetch_order_list(conn, %{"app_id" => app_id, "keyword" => keyword, "page" => page, "records_per_page" => records_per_page}),
    do: fetch_order_list(conn, app_id, keyword, page, records_per_page)
  def fetch_order_list(conn, _params),
    do: fetch_order_list(conn, "", "", 1, 100)
  defp fetch_order_list(conn, app_id, keyword, page, records_per_page) do
    {:ok, searchTotal, ids} = 
      Acs.Search.search_orders(keyword: keyword, app_id: app_id, page: page, records_per_page: records_per_page)

    queryTotal = from o in MallOrder, select: count(1), where: o.app_id == ^app_id
    total = if String.length(keyword)>0 , do: searchTotal, else: Repo.one!(queryTotal)

    if total == 0 do
      json(conn, %{success: true, total: 0, orders: []})
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
      json(conn, %{success: true, orders: orders, total: total_page})
    end
  end

  def fetch_order(conn, %{"order_id" => order_id }) do
    order = Malls.get_order_info(order_id)
    json(conn, %{success: true, order: order})
  end

  # create_mall_order
  def create_mall_order(%Plug.Conn{private: %{acs_session_user_id: user_id,
                                              acs_platform: platform,
                                              acs_device_id: device_id}} = conn,
                    %{"goods_id" => goods_id,
                      "quantity" => quantity,
                      "pay_type" => pay_type,
                      "address" => address}) do

      with %MallGoods{} = goods <- Repo.get(MallGoods, goods_id),
        order_id <- _create_order_id(user_id, pay_type)
      do
        final_price = goods.price * quantity + goods.postage
        if(quantity <= 0 or final_price < 0) do
          json(conn, %{success: false, i18n_message: "error.server.badRequestParams"})
        else
          if(goods.stock == 0 or goods.stock < quantity) do
            json(conn, %{success: false, i18n_message: "mall.order.stockOut"})
          else
            ip_address = case Plug.Conn.get_req_header(conn, "x-forwarded-for") do
              [val | _] -> val
              _ -> conn.remote_ip |> :inet_parse.ntoa |> to_string
            end

            Repo.transaction(fn ->
              # goods stock
              MallGoods.changeset(goods, %{stock: goods.stock - quantity, sold: goods.sold + quantity}) |> Repo.update()
              CachedMallGoods.refresh(goods)

              # add order
              mapGoods= Map.from_struct(goods) |> Map.drop([:__meta__, :app, :user])
              snapshots = Map.put(%{}, goods_id, mapGoods)
              order = %{"id": order_id, "platform": platform, "device_id": device_id, "user_ip": ip_address,
                      "goods_name": goods.name, "price": goods.price, "postage": goods.postage,
                      "discount": 0, "final_price": final_price, "currency": goods.currency, "paid_type": pay_type,
                      "app_id": goods.app_id, "user_id": user_id, "address": address, "snapshots": snapshots}

              {:ok, _mall_order} = MallOrder.changeset(%MallOrder{}, order) |> Repo.insert

              # add order detail
              order_detail = %{"goods_name": goods.name, "goods_pic": goods.pic, "price": goods.price,
                            "amount": quantity, "mall_goods_id": goods.id, "mall_order_id": order_id}

              {:ok, _mall_order_detail} = MallOrderDetail.changeset(%MallOrderDetail{}, order_detail) |> Repo.insert
            end)
            json(conn, %{success: true, order_id: order_id, i18n_message: "mall.order.addSuccess"})
          end
        end
      else
        nil ->
          json(conn, %{success: false, i18n_message: "error.server.illegal"})
      end
  end
  def create_mall_order(conn, _),
    do: json(conn, %{success: false, i18n_message: "error.server.badRequestParams", action: "login"})
  defp _create_order_id(user_id, pay_type) do
    order_id = Integer.to_string(Utils.unix_timestamp) <> String.slice(Integer.to_string(user_id), -4, 4)
    order_id = 
      case pay_type do
        "wechat" -> "w" <> order_id
        "alipay" -> "a" <> order_id
      end
    order_id
  end

  def fetch_my_orders(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                      %{"type" => type, "page" => page, "records_per_page" => records_per_page})
    when type in ["all","waitPay","waitConfirm"],
      do: fetch_my_orders(conn,user_id, type, page, records_per_page)
  def fetch_my_orders(conn, _params) do
    json(conn, %{success: false, i18n_message: "mall.order.messages.illegal"})
  end
  defp fetch_my_orders(conn, _user_id, type, page, records_per_page) do
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
    json(conn, %{success: true, orders: orders, total: total_page})
  end

  def confirm_recieved(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, 
                        %{"order_id" => order_id}) do
    order = Repo.get!(MallOrder, order_id)
    cond  do
      not order.status in [1,2]  ->
        json(conn, %{success: false, i18n_message: "mall.order.messages.repeatRecieved"})
      order.user_id != user_id ->
        json(conn, %{success: false, i18n_message: "mall.order.messages.illegal"})
      true ->
        finish_status = 4
        from( od in MallOrder, where: od.id == ^order.id) |> Repo.update_all( set: [status: finish_status])
        new_order = Map.put(order, :status, finish_status)
        json(conn, %{success: true, order: new_order, i18n_message: "mall.order.messages.recievedSuccess"})
    end
  end

end
