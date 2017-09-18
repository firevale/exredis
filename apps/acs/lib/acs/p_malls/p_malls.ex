defmodule Acs.PMalls do
  @moduledoc """
  The PMalls context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo
  alias Acs.Search

  alias Acs.PMalls.PMallGoods
  alias Acs.PMalls.PointLog

  alias Acs.Cache.CachedPMallGoods

  def get_pmall_goods(goods_id) do
    Repo.get(PMallGoods, goods_id)
  end

  def get_pmall_goods_detail(goods_id) do
    CachedPMallGoods.get(goods_id)
  end

  def list_pmall_goods(app_id, page, records_per_page, keyword) do
    {:ok, searchTotal, ids} = Search.search_pmall_goods(keyword, page, records_per_page, false)

    queryTotal = from g in PMallGoods, select: count(1), where: g.app_id == ^app_id and g.active == true
    total = if String.length(keyword)>0 , do: searchTotal, else: Repo.one!(queryTotal)

    if total == 0 do
      :zero
    else
      total_page = round(Float.ceil(total / records_per_page))
      query = from g in PMallGoods,
                where: g.app_id == ^app_id and g.active == true,
                order_by: [desc: g.inserted_at],
                limit: ^records_per_page,
                offset: ^((page - 1) * records_per_page),
                select: map(g, [:id, :name, :currency, :pic, :price, :original_price, :postage, :stock, :sold, :active, :is_virtual, :begin_time, :end_time])

      query = if(String.length(keyword)>0) do
        query |> where([p], p.id in ^ids)
      else
        query
      end

      goodses = Repo.all(query)
      {:ok, goodses, total_page}
    end
  end

  def list_pmall_goods_admin(app_id, page, records_per_page, keyword) do
    {:ok, searchTotal, ids} = Search.search_pmall_goods(keyword, page, records_per_page, true)

    queryTotal = from g in PMallGoods, select: count(1), where: g.app_id == ^app_id
    total = if String.length(keyword)>0 , do: searchTotal, else: Repo.one!(queryTotal)

    if total == 0 do
      :zero
    else
      total_page = round(Float.ceil(total / records_per_page))
      query = from g in PMallGoods,
                where: g.app_id == ^app_id,
                order_by: [desc: g.inserted_at],
                limit: ^records_per_page,
                offset: ^((page - 1) * records_per_page),
                select: map(g, [:id, :name, :currency, :pic, :price, :original_price, :postage, :stock, :sold, :active, :is_virtual, :begin_time, :end_time])

      query = if(String.length(keyword)>0) do
        query |> where([p], p.id in ^ids)
      else
        query
      end

      goodses = Repo.all(query)
      {:ok, goodses, total_page}
    end
  end

  def update_pmall_goods_pic(goods, image_path) do
    PMallGoods.changeset(goods, %{pic: image_path}) |> Repo.update!
    CachedPMallGoods.refresh(goods)
  end

  def update_pmall_goods(user_id, goods) do
    case goods.is_new do
      true ->
        # add new
        count = Repo.one!(from g in PMallGoods, select: count(1), where: g.app_id == ^goods.app_id and g.id == ^goods.id)
        if(count > 0) do
          :exist
        else
          goods = goods |> Map.put("user_id", user_id)
          case PMallGoods.changeset(%PMallGoods{}, goods) |> Repo.insert do
            {:ok, new_goods} ->
              goods = Map.put(goods, "inserted_at", new_goods.inserted_at) |> Map.put("active", false)
              CachedPMallGoods.refresh(goods.id)
              {:add_ok, goods}
            {:error, %{errors: _errors}} ->
              :error
          end
        end

      false ->
        # update
        case Repo.get(PMallGoods, goods.id) do
          nil ->
            nil

          %PMallGoods{} = mg ->
            goods = Map.put(goods, "user_id", user_id)
            changed = PMallGoods.changeset(mg, %{name: goods.name, 
                                                description: goods.description, 
                                                pic: goods.pic, 
                                                price: goods.price, 
                                                postage: goods.postage, 
                                                stock: goods.stock, 
                                                is_virtual: goods.is_virtual, 
                                                begin_time: goods.begin_time, 
                                                end_time: goods.end_time})
            changed |> Repo.update!
            CachedPMallGoods.refresh(goods.id)
            {:update_ok, goods, changed.changes}
        end
    end
  end

  def toggle_pmall_goods_status(goods_id) do
    case Repo.get(PMallGoods, goods_id) do
      nil ->
        nil
      %PMallGoods{} = goods ->
        PMallGoods.changeset(goods, %{active: !goods.active}) |> Repo.update!
        {:ok, !goods.active}
    end
  end

  def delete_pmall_goods(goods_id) do
    case Repo.get(PMallGoods, goods_id) do
      nil ->
        nil
      %PMallGoods{} = goods ->
        if(goods.sold > 0) do
          :sold
        else
          case Repo.delete(goods) do
            {:ok, _} ->
              CachedPMallGoods.del(goods_id)
              :ok

            {:error, %{errors: errors}} ->
              {:error, errors}
          end
        end
    end
  end

  def list_pmall_point_logs(app_id, user_id, page, records_per_page) do
    totalQuery = from pl in PointLog, where: pl.app_id == ^app_id, select: count(pl.id)
    totalQuery = case String.length(user_id) do
      0 -> totalQuery
      _ -> where(totalQuery, [pl], pl.user_id == ^user_id)
    end
    total_page = round(Float.ceil(Repo.one!(totalQuery) / records_per_page))

    query = from pl in PointLog,
              join: u in assoc(pl, :user),
              select: map(pl, [:id, :log_type, :point, :memo, :user_id, :inserted_at, user: [:id, :email]]),
              limit: ^records_per_page,
              where: pl.app_id == ^app_id,
              offset: ^((page - 1) * records_per_page),
              order_by: [desc: pl.id],
              preload: [user: u]

    query = case String.length(user_id) do
      0 -> query
      _ -> where(query, [pl], pl.user_id == ^user_id)
    end
    logs = Repo.all(query)
    {:ok, logs, total_page}
  end

  def add_point(log) do
    case PointLog.changeset(%PointLog{}, log) |> Repo.insert do
      {:ok, new_log} ->
        log = Map.put(log, "id", new_log.id) |> Map.put("inserted_at", new_log.inserted_at)
        {:ok, log}

      {:error, %{errors: errors}} ->
        {:error, errors}
    end
  end

  def admin_add_pmall_point(user_id, app_id, log) do
    log = Map.put(log, "app_id", app_id) |> Map.put("user_id", user_id) |> Map.put("log_type", "admin_op")
    add_point(log)
  end

  def add_goods_click(goods_id, click) do
    goods = Repo.get(PMallGoods, goods_id)
    PMallGoods.changeset(goods, %{reads: goods.reads+click}) |> Repo.update()
    CachedPMallGoods.refresh(goods)
  end

end
