defmodule AcsWeb.PMallController do
  use AcsWeb, :controller

  plug :fetch_app_id
  plug :fetch_access_token
  plug :fetch_session_user_id
  plug :fetch_session_user

  # list_pmall_goods
  def list_pmall_goods(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, 
                                      %{"page" => page, 
                                      "records_per_page" => records_per_page,
                                      "keyword" => keyword}) do
    case PMalls.list_pmall_goods(app_id, page, records_per_page, keyword) do
      :zero ->
        conn |> json(%{success: true, total: 0, goodses: []})
      {:ok, goodses, total_page} ->
        conn |> json(%{success: true, goodses: goodses, total: total_page})
    end
  end
  def list_pmall_goods(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def get_pmall_goods_detail(conn,%{"goods_id" =>goods_id})do
    goods = PMalls.get_pmall_goods_detail(goods_id)
    PMalls.add_goods_click(goods_id, 1)
    conn |> json(%{success: true, goods: goods})
  end
  def get_pmall_goods_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

end
