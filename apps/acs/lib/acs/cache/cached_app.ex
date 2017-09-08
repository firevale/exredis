defmodule Acs.Cache.CachedApp do
  require Exredis
  require Excache

  alias   Acs.Repo
  alias   Acs.Apps.App

  @key_base     "acs.app"

  def get("account-center"), do: nil

  def get(app_id) when is_bitstring(app_id) do
    Excache.get!(key(app_id), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case refresh(app_id) do 
            nil -> {:ignore, nil}
            app -> {:commit, app}
          end

        raw ->
          {:commit, raw |> App.from_redis}
      end
    end)
  end

  def refresh(app_id) when is_bitstring(app_id) do
    case Repo.get(App, app_id) do 
      %App{} = app ->
        Exredis.set(key(app_id), App.to_redis(app))
        key(app_id) |> Excache.del
        app
      _ -> nil
    end
  end

  defp key(app_id), do: "#{@key_base}.#{app_id}" 

end
