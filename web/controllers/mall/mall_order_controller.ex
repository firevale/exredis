defmodule Acs.MallOrderController do
  use Acs.Web, :controller

  # alias   Acs.RedisMall
  require Floki

  plug :fetch_app_id
  plug :fetch_access_token 
  plug :fetch_session_user_id
  plug :fetch_session_user
  plug :fetch_device_id
  plug :check_is_admin when action in [:delete_goods]

  # fetch_malls
  def fetch_order_list(conn, %{"app_id" => app_id, "keyword" => keyword, "page" => page, "records_per_page" => records_per_page}) do
    fetch_order_list(conn,app_id, keyword, page, records_per_page)
  end
  def fetch_order_list(conn, _params) do
    fetch_order_list(conn,'','', 1, 100)
  end
  defp fetch_order_list(conn, app_id, keyword,  page, records_per_page) do
     {:ok,searchTotal,ids} =search_orders(app_id, keyword,page,records_per_page)      

    queryTotal = from o in MallOrder, select: count(1), where: o.app_id == ^app_id
    total = if String.length(keyword)>0 , do: searchTotal, else: Repo.one!(queryTotal)

    if total == 0 do
      conn |> json(%{success: true, total: 0, orders: []})
    else
      total_page = round(Float.ceil(total / records_per_page))
      query = from order in MallOrder,
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

       query = if(String.length(keyword)>0) do
                  query |> where([o], o.id in ^ids)
               else
                  query
               end

      orders = Repo.all(query)
      conn |> json(%{success: true, orders: orders, total: total_page})
    end
  end

  def search_orders(app_id,keyword,page,records_per_page) do
    if String.length(keyword)>0 do
      query = %{
        query: %{
          bool: %{
            must: %{term: %{app_id: app_id}},
            should: [
              %{term: %{id: keyword}},
              %{term: %{goods_name: keyword}},
              %{term: %{app_id: keyword}},
              %{term: %{user_ip: keyword}},
              %{term: %{memo: keyword}},
              %{term: %{"address.name": keyword}},
              %{term: %{"address.mobile": keyword}},
              %{term: %{transaction_id: keyword}}
            ],
            minimum_should_match: 1,
            boost: 1.0,
          },
        },
        sort: %{inserted_at: %{order: :desc}},
        from: (page - 1) * records_per_page,
        size: records_per_page,
      }

      query = case Integer.parse(keyword) do
              {int_keyword,""} ->
                  update_in(query.query.bool.should,&(&1++[ %{term: %{user_id: int_keyword}}]))
               _ ->
                  query
              end

      case Elasticsearch.search(%{index: "mall", type: "orders", query: query, params: %{timeout: "1m"}}) do
        {:ok, %{hits: %{hits: hits, total: total}}} ->
          ids = Enum.map(hits, &(&1._id))
          {:ok, total, ids }
        error ->
          error "search orders failed: #{inspect error, pretty: true}"
          throw(error)
      end
    else
      {:ok, 0, {}}
    end
  end

  def fetch_order(conn, %{"order_id" => order_id }) do
    fetch_order_info(conn,order_id)
  end

  defp fetch_order_info(conn, order_id) do
    query = from o in MallOrder,
              left_join: details in assoc(o, :details),
              left_join: user in assoc(o, :user),
              left_join: op_logs in assoc(o, :op_logs),
              select: map(o, [:id, :goods_name, :status, :price, :final_price, :address, :currency, :paid_type, :transaction_id, :postage, :inserted_at,
                user: [:id, :nickname, :mobile, :email],
                details: [:id, :goods_name, :goods_pic, :price, :amount],
                op_logs: [:id, :status, :changed_status, :content, :admin_user, :inserted_at] ]),                
              where: o.id ==^order_id,
              preload: [user: user, details: details, op_logs: op_logs]
    order = Repo.one(query)
    conn |> json(%{success: true, order: order})
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
          conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
        else
          if(goods.stock == 0 or goods.stock < quantity) do
            conn |> json(%{success: false, i18n_message: "mall.order.stockOut"})
          else
            ip_address = case Plug.Conn.get_req_header(conn, "x-forwarded-for") do
              [val | _] -> val
              _ -> conn.remote_ip |> :inet_parse.ntoa |> to_string
            end

            Repo.transaction(fn ->
              # goods stock
              MallGoods.changeset(goods, %{stock: goods.stock - quantity}) |> Repo.update()

              # add order
              {:ok, gd} = Poison.encode(goods)
              order = %{"id": order_id, "platform": platform, "device_id": device_id, "user_ip": ip_address, 
                      "goods_name": goods.name, "price": goods.price, "postage": goods.postage, 
                      "discount": 0, "final_price": final_price, "currency": goods.currency, "paid_type": pay_type,
                      "app_id": goods.app_id, "user_id": user_id, "address": address, "snapshots": gd}

              {:ok, mall_order} = MallOrder.changeset(%MallOrder{}, order) |> Repo.insert

              # add order detail
              order_detail = %{"goods_name": goods.name, "goods_pic": goods.pic, "price": goods.price, 
                            "amount": quantity, "mall_goods_id": goods.id, "mall_order_id": order_id}

              {:ok, mall_order_detail} = MallOrderDetail.changeset(%MallOrderDetail{}, order_detail) |> Repo.insert
            end)
            conn |>json(%{success: true, order_id: order_id, i18n_message: "mall.order.addSuccess"})          
          end
        end
      else
        nil ->
          conn |> json(%{success: false, i18n_message: "error.server.illegal"})
      end
  end
  def create_mall_order(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams", action: "login"})
  end
  defp _create_order_id(user_id, pay_type) do
    order_id = Integer.to_string(Utils.unix_timestamp) <> String.slice(Integer.to_string(user_id), -4, 4)
    order_id = case pay_type do
      "wechat" -> "w" <> order_id
      "alipay" -> "a" <> order_id
    end
    order_id
  end
  
  def fetch_my_orders(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
      %{"page" => page, "records_per_page" => records_per_page}) do
    fetch_my_orders(conn,user_id, page, records_per_page)
  end
  def fetch_my_orders(conn, _params) do
    fetch_my_orders(conn,0, 1, 100)
  end
  defp fetch_my_orders(conn, user_id, page, records_per_page) do
    total = Repo.one!(from order in MallOrder, select: count(1))
    total_page = round(Float.ceil(total / records_per_page))

    query = from order in MallOrder,
              left_join: details in assoc(order, :details),
              left_join: user in assoc(order, :user),
              select: map(order, [:id, :goods_name, :status, :price, :final_price, :currency, :postage, :inserted_at,
                user: [:id, :nickname, :mobile], 
                details: [:id, :goods_name, :goods_pic, :price, :amount] ]),
              order_by: [desc: order.inserted_at],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              preload: [user: user, details: details]
    orders = Repo.all(query)
    conn |> json(%{success: true, orders: orders, total: total_page})
  end

end
