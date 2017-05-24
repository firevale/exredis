defmodule Acs.RedisMall do
  require Redis
  use     LogAlias

  ########################################
  defstruct id: "",
            name: "",
            pic: "",
            description: "",
            price: 0,
            currency: "",
            postage: 0,
            stock: 0,
            sold: 0,
            reads: 0,
            active: true,
            app_id: ""

  alias   Acs.Repo
  import  Ecto.Query

  alias   Acs.MallGoods

  use     Utils.Jsonable
  require Cachex

  require Logger




  @mall_cache_key      "fvac.mall_cache"

  def find(id)  do
    key = "#{@mall_cache_key}.#{id}"
    Cachex.get!(:mem_cache, key, fallback: fn(redis_key) -> 
      case Redis.get(redis_key) do
        :undefined ->
          refreshById(id)
        raw ->
          raw |> from_json
      end
    end)
  end

  def refresh(goods)  do
    redis_key = "#{@mall_cache_key}.#{goods.id}"
    Cachex.del(:mem_cache, redis_key)
    cache = %__MODULE__{
      id: goods.id,
      name: goods.name,
      pic: goods.pic,
      description: goods.description,
      price: goods.price,
      currency: goods.currency,
      postage: goods.postage,
      stock: goods.stock,
      sold: goods.sold,
      reads: goods.reads,
      active: goods.active,
      app_id: goods.app_id
    }
    Redis.set(redis_key, to_json(cache))

    cache
  end

  def refreshById(id)  do
    query = from g in MallGoods,
              where: g.id == ^id,
              select: map(g, [:id, :name, :currency, :description, :pic, :price, :postage, :stock, :sold, :reads, :app_id, :active])

    case Repo.one(query) do
      nil -> nil
      goods -> refresh(goods)
    end
  end

  def delete(id) do
    redis_key = "#{@mall_cache_key}.#{id}"
    Redis.del(redis_key)
  end

end
