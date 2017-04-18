defmodule Acs.MallOrderController do
  use Acs.Web, :controller

  # alias   Acs.RedisMall
  require Floki

  plug :fetch_app_id
  plug :fetch_session_user_id
  plug :fetch_session_user
  plug :check_is_admin when action in [:update_goods, :update_goods_pic, :toggle_goods_status, :delete_goods]

  # fetch_malls
  def fetch_order_list(conn, %{"app_id" => app_id, "page" => page, "records_per_page" => records_per_page}) do
    fetch_order_list(conn,app_id, page, records_per_page)
  end
  def fetch_order_list(conn, _params) do
    fetch_order_list(conn,'', 1, 100)
  end
  defp fetch_order_list(conn, app_id, page, records_per_page) do
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

  def fetch_order(conn, %{"order_id" => order_id }) do
    fetch_order_info(conn,order_id)
  end

  defp fetch_order_info(conn, order_id) do
    query = from o in MallOrder,
              left_join: details in assoc(o, :details),
              left_join: user in assoc(o, :user),
              left_join: address in assoc(o, :user_address),
              left_join: op_logs in assoc(o, :op_logs),
              select: map(o, [:id, :goods_name, :status, :price, :final_price, :currency, :paid_type, :transaction_id, :postage, :inserted_at,
                user: [:id, :nickname, :mobile, :email],
                details: [:id, :goods_name, :goods_pic, :price, :amount],
                user_address: [:id, :name, :mobile, :area, :address, :area_code],
                op_logs: [:id, :status, :changed_status, :content, :admin_user, :inserted_at] ]),                
              where: o.id ==^order_id,
              preload: [user: user, user_address: address, details: details, op_logs: op_logs]
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
                      "user_address_id" => user_address_id}) do

      with %MallGoods{} = goods <- Repo.get(MallGoods, goods_id),
        order_id <- _create_order_id(user_id, pay_type)
      do
        final_price = goods.price * quantity + goods.postage
        if(quantity <= 0 or final_price < 0) do
          conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
        else
          ip = conn.remote_ip |> Tuple.to_list |> Enum.join(".")

          Repo.transaction(fn ->
            # add order
            order = %{"id": order_id, "platform": platform, "device_id": device_id, "user_ip": ip, 
                    "goods_name": goods.name, "price": goods.price, "postage": goods.postage, 
                    "discount": 0, "final_price": final_price, "currency": goods.currency, "paid_type": pay_type,
                    "app_id": goods.app_id, "user_id": user_id, "user_address_id": user_address_id}

            {:ok, mall_order} = MallOrder.changeset(%MallOrder{}, order) |> Repo.insert

            # add order detail
            order_detail = %{"goods_name": goods.name, "goods_pic": goods.pic, "price": goods.price, 
                          "amount": quantity, "mall_goods_id": goods.id, "mall_order_id": order_id}

            {:ok, mall_order_detail} = MallOrderDetail.changeset(%MallOrderDetail{}, order_detail) |> Repo.insert

            conn |>json(%{success: true, order: mall_order, order_detail: mall_order_detail, i18n_message: "mall.order.addSuccess"})
            :ok
          end)
        end
        
      else
        nil ->
          conn |> json(%{success: false, i18n_message: "error.server.illegal"})
      end
  end
  def create_mall_order(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  defp _create_order_id(user_id, pay_type) do
    order_id = Utils.unix_timestamp <> String.slice(user_id, -4, 4)
    order_id = case pay_type do
      "wechat" -> "w" <> order_id
      "alipay" -> "a" <> order_id
    end
    order_id
  end
end
