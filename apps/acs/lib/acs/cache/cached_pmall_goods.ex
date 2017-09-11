defmodule Acs.CachePMallGoods do
  require Exredis
  require Excache

  alias   Acs.Repo
  alias   Acs.PMalls.PMallGoods

  @key_base      "acs.pmall_goods"

  def get(goods_id)  do
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

  def refresh(goods = %PMallGoods{}) do
    key(goods.id) |> Exredis.setex(7200, PMallGoods.to_redis(goods))
    key(goods.id) |> Excache.del
    goods
  end

  def refresh(goods_id)  do
    key(goods_id) |> Excache.del

    case Repo.get(PMallGoods, goods_id) do 
      nil -> nil
      %PMallGoods{} = goods -> refresh(goods)
    end
  end

  def del(goods_id) do
    key(goods_id) |> Excache.del
    key(goods_id) |> Exredis.del
  end

  defp key(goods_id), do: "#{@key_base}.#{goods_id}"
end
