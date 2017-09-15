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
    malls = Malls.fetch_malls(app_id)
    conn |> json(%{success: true, malls: malls})
  end  
  def fetch_malls(conn, _params) do
    fetch_malls(conn, 1, 100)
  end
  defp fetch_malls(conn, page, records_per_page) do
    {:ok, malls, total_page} = Malls.fetch_malls(page, records_per_page)
    conn |> json(%{success: true, malls: malls, total: total_page})
  end

  # fetch_goods
  def fetch_goods(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, 
                                      %{"page" => page, 
                                      "records_per_page" => records_per_page,
                                      "keyword" => keyword}) do
    case Malls.fetch_goods(app_id, page, records_per_page, keyword) do
      :zero ->
        conn |> json(%{success: true, total: 0, goodses: []})
      {:ok, goodses, total_page} ->
        conn |> json(%{success: true, goodses: goodses, total: total_page})
    end
  end
  def fetch_goods(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  #  show active_mall_goods
  def get_active_goods_paged(conn, %{"page" => page,
                        "records_per_page" => records_per_page,
                        "app_id" => app_id}) do
    {:ok, goodses, total_page} = Malls.get_active_goods_paged(app_id, page, records_per_page)
    conn |> json(%{success: true, goodses: goodses, total: total_page})
  end

  def get_goods_stock(conn,%{"goods_id" => goods_id})do
    stock = Malls.get_goods_stock(goods_id)
    conn |> json(%{success: true, stock: stock})
  end

  def get_mall_detail(conn,%{"app_id" => app_id})do
    mall = Malls.get_mall_detail(app_id)
    conn |> json(%{success: true, mall: mall})
  end

  def get_goods_detail(conn,%{"goods_id" =>goods_id})do
    goods = Malls.get_goods_detail(goods_id)
    conn |> json(%{success: true, goods: goods})
  end

end
