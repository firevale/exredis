defmodule Acs.MallOrderController do
  use Acs.Web, :controller

  # alias   Acs.RedisMall
  require Floki

  plug :fetch_app_id
  plug :fetch_session_user_id  
  plug :fetch_session_user
  # plug :check_forum_manager when action in [:delete_comment, :toggle_post_status]
  # plug :cache_page, [cache_seconds: 10] when action in [:get_paged_post, :get_post_comments, :get_post_detail]
  # plug :cache_page, [cache_seconds: 600] when action in [:get_forum_info, :get_paged_forums]
  plug :check_is_admin when action in [:update_goods, :update_goods_pic, :toggle_goods_status, :delete_goods]

  # fetch_malls
  def get_order_list(conn, %{"page" => page, "records_per_page" => records_per_page}) do
    get_order_list(conn, page, records_per_page)
  end
  def get_order_list(conn, _params) do
    get_order_list(conn, 1, 100)
  end
  defp get_order_list(conn, page, records_per_page) do
    total = Repo.one!(from m in Mall, select: count(1))
    total_page = round(Float.ceil(total / records_per_page))

    query = from m in Mall,
              order_by: [desc: m.inserted_at],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: map(m, [:id, :title, :icon, :app_id, :inserted_at])

    malls = Repo.all(query)
    conn |> json(%{success: true, malls: malls, total: total_page})
  end  
 
end
