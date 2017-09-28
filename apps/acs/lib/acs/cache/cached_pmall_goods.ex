defmodule Acs.Cache.CachedPMallGoods do
  import Ecto.Query, warn: false
  alias Acs.Repo

  require Exredis
  require Excache

  alias   Acs.PMalls.PMallGoods

  @key_base      "acs.pmall_goods"

  def get(goods_id) do
    Excache.get!(key(goods_id), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do
        nil ->
          case refresh(goods_id) do
            nil -> {:ignore, nil}
            v -> {:commit, v}
          end
        raw ->
          {:commit, raw |> PMallGoods.from_redis()}
      end
    end)
  end

  def list(app_id) do 
    Excache.get!(list_key(app_id), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do
        nil ->
          query = from g in PMallGoods,
            select: g.id,
            where: g.app_id == ^app_id,
            where: g.active == true,
            order_by: [desc: g.inserted_at]

          goods_ids = Repo.all(query)
          Exredis.set(redis_key, Poison.encode!(goods_ids))
          goodses = for goods_id <- goods_ids, do: get(goods_id)
          {:commit, goodses}
        raw ->
          goodses = for goods_id <- Poison.decode!(raw), do: get(goods_id)
          {:commit, goodses}
      end
    end)
  end

  def refresh(goods = %PMallGoods{}) do
    key(goods.id) |> Exredis.set(PMallGoods.to_redis(goods))
    key(goods.id) |> Excache.del

    list_key(goods.app_id) |> Exredis.del
    list_key(goods.app_id) |> Excache.del

    goods
  end

  def refresh(goods_id)  do
    key(goods_id) |> Excache.del

    case Repo.get(PMallGoods, goods_id) do 
      nil -> nil
      %PMallGoods{} = goods -> refresh(goods)
    end
  end

  def del(goods = %PMallGoods{}) do
    key(goods.id) |> Excache.del
    key(goods.id) |> Exredis.del

    list_key(goods.app_id) |> Exredis.del
    list_key(goods.app_id) |> Excache.del
  end

  defp key(goods_id), do: "#{@key_base}.#{goods_id}"
  defp list_key(app_id), do: "#{@key_base}.__all__.#{app_id}"
end
