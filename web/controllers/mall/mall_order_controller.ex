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
              left_join: address in assoc(order, :user_address),
              select: map(order, [:id, :goods_name, :status, :price, :final_price, :postage, :inserted_at,
                user: [:id, :nickname, :mobile], 
                details: [:id, :goods_name, :goods_pic, :price, :amount],
                user_address: [:id, :name, :mobile, :area, :address, :area_code] ]),
              order_by: [desc: order.inserted_at],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              preload: [user: user, user_address: address, details: details]
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
              select: map(o, [:id, :goods_name, :status, :price, :final_price, :postage, :inserted_at,
                user: [:id, :nickname, :mobile, :email],
                details: [:id, :goods_name, :goods_pic, :price, :amount],
                user_address: [:id, :name, :mobile, :area, :address, :area_code],
                op_logs: [:id, :status, :changed_status, :content, :admin_user, :inserted_at] ]),                
              where: o.id ==^order_id,
              preload: [user: user, user_address: address, details: details, op_logs: op_logs]
    order = Repo.one(query)
    conn |> json(%{success: true, order: order})
  end
end
