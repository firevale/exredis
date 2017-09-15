defmodule AcsWeb.MallOrderController do
  use AcsWeb, :controller

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
    case Malls.fetch_order_list(app_id, keyword, page, records_per_page) do
      :zero ->
        json(conn, %{success: true, total: 0, orders: []})
      {:ok, orders, total_page} ->
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
                                            %{"goods_id" => _goods_id,
                                              "quantity" => _quantity,
                                              "pay_type" => _pay_type,
                                              "address" => _address} = order) do
    ip_address = case Plug.Conn.get_req_header(conn, "x-forwarded-for") do
      [val | _] -> val
      _ -> conn.remote_ip |> :inet_parse.ntoa |> to_string
    end
    case Malls.create_mall_order(user_id, platform, device_id, ip_address, order) do
      :badrequest ->
        json(conn, %{success: false, i18n_message: "error.server.badRequestParams"})
      :stockout ->
        json(conn, %{success: false, i18n_message: "mall.order.stockOut"})
      {:ok, order_id} ->
        json(conn, %{success: true, order_id: order_id, i18n_message: "mall.order.addSuccess"})
      :illegal ->
        json(conn, %{success: false, i18n_message: "error.server.illegal"})
    end
  end
  def create_mall_order(conn, _),
    do: json(conn, %{success: false, i18n_message: "error.server.badRequestParams", action: "login"})


  def fetch_my_orders(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                      %{"type" => type, "page" => page, "records_per_page" => records_per_page})
    when type in ["all","waitPay","waitConfirm"],
      do: fetch_my_orders(conn,user_id, type, page, records_per_page)
  def fetch_my_orders(conn, _params) do
    json(conn, %{success: false, i18n_message: "mall.order.messages.illegal"})
  end
  defp fetch_my_orders(conn, user_id, type, page, records_per_page) do
    {:ok, orders, total_page} = Malls.fetch_my_orders(type, user_id, page, records_per_page)
    json(conn, %{success: true, orders: orders, total: total_page})
  end

  def confirm_recieved(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, 
                        %{"order_id" => order_id}) do
    case Malls.confirm_recieved(user_id, order_id) do
      :received ->
        json(conn, %{success: false, i18n_message: "mall.order.messages.repeatRecieved"})
      :illegal ->
        json(conn, %{success: false, i18n_message: "mall.order.messages.illegal"}) 
      {:ok, new_order} ->
        json(conn, %{success: true, order: new_order, i18n_message: "mall.order.messages.recievedSuccess"})
    end
  end
  
end
