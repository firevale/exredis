defmodule Acs.Cache.CachedMallGoods do
  require Exredis
  require Excache

  alias   Acs.Repo
  alias   Acs.Malls.MallGoods

  @key_base      "acs.mall_goods"

  def get(goods_id)  do
    Excache.get!(key(goods_id), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do
        nil ->
          case refresh(goods_id) do
            nil -> {:ignore, nil}
            v -> {:commit, v}
          end
        raw ->
          {:commit, raw |> MallGoods.from_redis()}
      end
    end)
  end

  def refresh(goods = %MallGoods{}) do
    key(goods.id) |> Exredis.set(MallGoods.to_redis(goods))
    key(goods.id) |> Excache.del
    goods
  end

  def refresh(goods_id)  do
    case Repo.get(MallGoods, goods_id) do 
      nil -> nil
      %MallGoods{} = goods -> refresh(goods)
    end
  end

  def del(goods_id) do
    key(goods_id) |> Excache.del
    key(goods_id) |> Exredis.del
  end

  defp key(goods_id), do: "#{@key_base}.#{goods_id}"
  

end
