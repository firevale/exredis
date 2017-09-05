defmodule Acs.RedisPointMall do
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
            is_virtual: false,
            begin_time: "",
            end_time: "",
            app_id: ""

  alias   Acs.Repo
  import  Ecto.Query

  alias   Acs.PointMallGoods

  use     Utils.Redisable
  require Cachex

  require Logger

  @mall_cache_key      "acs.point_mall_cache"

  def find(id)  do
    key = "#{@mall_cache_key}.#{id}"
    Cachex.get!(:default, key, fallback: fn(redis_key) -> 
      case Redis.get(redis_key) do
        :undefined ->
          case refreshById(id) do
            nil -> {:ignore, nil}
            mall -> {:commit, mall}
          end
        raw ->
          {:commit, raw |> from_redis}
      end
    end)
  end

  def refresh(goods)  do
    redis_key = "#{@mall_cache_key}.#{goods.id}"
    Cachex.del(:default, redis_key)
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
      is_virtual: goods.is_virtual,
      begin_time: goods.begin_time,
      end_time: goods.end_time,
      app_id: goods.app_id
    }
    Redis.set(redis_key, to_redis(cache))

    cache
  end

  def refreshById(id)  do
    query = from g in PointMallGoods,
              where: g.id == ^id,
              select: map(g, [:id, :name, :currency, :description, :pic, :price, :postage, :stock, :sold, :reads, :app_id, :active, :is_virtual, :begin_time, :end_time])

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
