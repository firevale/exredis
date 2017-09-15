defmodule Acs.Cache.CachedApp do
  require Exredis
  require Excache

  alias   Acs.Repo
  import  Ecto.Query, warn: false

  alias   Acs.Apps.App

  @key_base     "acs.app"

  def get("account-center"), do: nil

  def get(app_id) when is_bitstring(app_id) do
    _get(app_id, key(app_id), &_refresh/1)
  end

  def get_fat(app_id) when is_bitstring(app_id) do
    _get(app_id, fat_key(app_id), &_refresh_fat/1)
  end

  defp _get(app_id, key, fun) do 
    Excache.get!(key, fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case fun.(app_id) do 
            nil -> {:ignore, nil}
            app -> {:commit, app}
          end

        raw ->
          {:commit, raw |> App.from_redis}
      end
    end)
  end

  def refresh(app_id) when is_bitstring(app_id) do
    _refresh(app_id)
    _refresh_fat(app_id)
  end

  defp _refresh(app_id) when is_bitstring(app_id) do
    case Repo.get(App, app_id) do 
      %App{} = app ->
        Exredis.set(key(app_id), App.to_redis(app))
        key(app_id) |> Excache.del
        app
      _ -> nil
    end
  end

  defp _refresh_fat(app_id) when is_bitstring(app_id) do 
    query = 
      from app in App,
        left_join: sdk in assoc(app, :sdk_bindings),
        left_join: goods in assoc(app, :goods),
        left_join: product_ids in assoc(goods, :product_ids),
        order_by: [desc: app.inserted_at, asc: sdk.inserted_at, asc: goods.inserted_at],
        where: app.active == true and app.id == ^app_id,
        select: app,
        preload: [sdk_bindings: sdk, goods: {goods, product_ids: product_ids}]

    case Repo.one(query) do 
      %App{} = app ->
        Exredis.set(fat_key(app_id), App.to_redis(app))
        key(app_id) |> Excache.del
        app
      _ -> nil     
    end
  end

  defp key(app_id), do: "#{@key_base}.#{app_id}" 
  defp fat_key(app_id), do: "#{@key_base}.fat.#{app_id}" 

end
