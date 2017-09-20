defmodule Acs.Cache.CachedAppGoods do
  require Exredis
  require Excache

  alias   Acs.Repo
  import  Ecto.Query, warn: false

  alias   Acs.Apps.AppGoods

  @key_base     "acs.app.goods"

  def get(goods_id) do
    Excache.get!(key(goods_id), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case refresh(goods_id) do 
            nil -> {:ignore, nil}
            v -> {:commit, v}
          end

        raw ->
          {:commit, AppGoods.from_redis(raw)}
      end
    end)
  end

  def refresh(goods_id) do
    query = 
      from goods in AppGoods,
        left_join: product_ids in assoc(goods, :product_ids),
        select: goods,
        order_by: [asc: goods.inserted_at],
        preload: [product_ids: product_ids],
        where: goods.id == ^goods_id
   
    case Repo.one(query) do 
      %AppGoods{} = goods ->
        product_ids = 
          goods.product_ids 
          |> Enum.map( &( {&1.sdk, &1.product_id}))
          |> Enum.into(%{})

        goods = Map.put(goods, :product_ids_map, product_ids)

        Exredis.set(key(goods_id), AppGoods.to_redis(goods))
        Excache.del(key(goods_id))
        goods

      _ -> 
        nil
    end
  end

  defp key(goods_id), do: "#{@key_base}.#{goods_id}" 

end
