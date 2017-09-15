defmodule Acs.Cache.CachedMall do
  require Exredis
  use     Utils.LogAlias

  alias   Acs.Repo
  import  Ecto.Query, warn: false

  alias   Acs.Malls.Mall

  @key_base   "acs.mall"

  def get(nil), do: nil
  def get(""), do: nil
  def get(mall_id) do
    Excache.get!(key(mall_id), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case _refresh(mall_id) do 
            nil -> {:ignore, nil}
            v -> {:commit, v}
          end

        raw ->
          {:commit, raw |> Mall.from_redis}
      end
    end)
  end

  def get_by(app_id: app_id) do 
    case Exredis.get(app_key(app_id)) do
      nil -> 
        query = 
          from mall in Mall,
            where: mall.app_id == ^app_id,
            select: mall.id
        
        case Repo.one(query) do 
          nil -> nil 
          mall_id ->
            Exredis.set(app_key(app_id), mall_id)
            get(mall_id)
        end

      mall_id ->
        get(mall_id)
    end
  end

  # v: 
  #   1. %Mall{}
  #   2. mall_id
  def refresh(v) do 
    _refresh(v)
  end

  def _refresh(%Mall{id: mall_id, app_id: app_id} = mall) do 
    Exredis.set(key(mall_id), Mall.to_redis(mall))
    Excache.del(key(mall_id))
    Exredis.set(app_key(app_id), mall_id)
    mall
  end
  def _refresh(mall_id) do
    case Repo.get(Mall, mall_id) do
      %Mall{} = mall ->
        _refresh(mall)
      _ -> 
        nil
    end
  end

  def key(mall_id), do: "#{@key_base}.#{mall_id}"
  def app_key(app_id), do: "#{@key_base}.app.#{app_id}"

end
