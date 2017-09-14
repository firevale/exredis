defmodule AcsWeb.PMallController do
  use AcsWeb, :controller

  plug :fetch_app_id
  plug :fetch_access_token
  plug :fetch_session_user_id
  plug :fetch_session_user
  plug :cache_page, [cache_seconds: 10] when action in [:fetch_malls, :get_active_goods_paged]
  plug :check_is_admin when action in [:update_goods, :update_goods_pic, :toggle_goods_status, :delete_goods]

  # fetch_goods
  def fetch_goods(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"page" => page, "records_per_page" => records_per_page,
   "keyword" => keyword}) do

    {:ok,searchTotal,ids} =search_goods(app_id, keyword,page,records_per_page)

    queryTotal = from g in PMallGoods, select: count(1), where: g.app_id == ^app_id
    total = if String.length(keyword)>0 , do: searchTotal, else: Repo.one!(queryTotal)

    if total == 0 do
      conn |> json(%{success: true, total: 0, goodses: []})
    else
        total_page = round(Float.ceil(total / records_per_page))
        query = from g in PMallGoods,
              where: g.app_id == ^app_id,
              order_by: [desc: g.inserted_at],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: map(g, [:id, :name, :pic, :price, :postage, :stock, :sold, :active, :is_virtual, :begin_time, :end_time])

        query = if(String.length(keyword)>0) do
          query |> where([p], p.id in ^ids)
        else
          query
        end

         goodses = Repo.all(query)
         conn |> json(%{success: true, goodses: goodses, total: total_page})
    end
  end
  def fetch_goods(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  defp search_goods(_app_id, keyword, page, records_per_page) do
    Search.search_pmall_goods(keyword, page, records_per_page)
  end

  def get_goods_detail(conn,%{"goods_id" =>goods_id})do
    goods = CachedPMallGoods.get(goods_id)
    add_goods_click(goods_id,1)
    conn |> json(%{success: true, goods: goods})
  end
  def get_goods_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  defp add_goods_click(goods_id, click) do
    goods = Repo.get(PMallGoods, goods_id)
    PMallGoods.changeset(goods, %{reads: goods.reads+click}) |> Repo.update()
    CachedPMallGoods.refresh(goods)
  end

  def add_point(conn, log) do
    case PointLog.changeset(%PointLog{}, log) |> Repo.insert do
      {:ok, new_log} ->
        log = Map.put(log, "id", new_log.id) |> Map.put("inserted_at", new_log.inserted_at)
        conn |> json(%{success: true, log: log})

      {:error, %{errors: errors}} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
    end
  end

end
