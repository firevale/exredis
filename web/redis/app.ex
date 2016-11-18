defmodule Acs.RedisApp do
  require Redis
  # require Utils
  # require Logger

  alias   Acs.Repo
  import  Ecto.Query

  alias   Acs.App
  alias   Acs.AppSdkBinding

  ########################################
  defstruct id: 0,
            secret: nil,
            name: nil,
            currency: "CNY",
            payment_callback: "",
            sdk_bindings: %{}

  use     Utils.Jsonable 

  @app_cache_key     "fvac.app_cache"

  def find(id) when is_bitstring(id) do 
    redis_key = "#{@app_cache_key}.#{id}"

    case Redis.get(redis_key) do 
      :undefined ->
        refresh(id)
      raw -> 
        raw |> from_json
    end
  end

  def refresh(id) when is_bitstring(id) do 
    redis_key = "#{@app_cache_key}.#{id}"

    query = from app in App,
              left_join: bindings in assoc(app, :sdk_bindings),
              left_join: goods in assoc(app, :goods),
              left_join: callbacks in assoc(app, :sdk_payment_callbacks),
              left_join: goods_product_ids in assoc(goods, :product_ids),
              where: app.id == ^id,
              select: app, 
              preload: [sdk_bindings: bindings, 
                        goods: {goods, product_ids: goods_product_ids},
                        sdk_payment_callbacks: callbacks] 

    case Repo.one(query) do 
      nil -> nil 
      %App{} = app ->
        sdk_bindings = app.sdk_bindings |> Enum.map(fn(%AppSdkBinding{} = app_sdk_binding) ->
          {app_sdk_binding.sdk |> String.to_atom, app_sdk_binding.bindings} 
        end) |> Enum.into(%{})

        cache = %__MODULE__{
          id: app.id,
          secret: app.secret,
          name: app.name,
          currency: app.currency,
          payment_callback: app.payment_callback,
          sdk_bindings: sdk_bindings
        }

        Redis.set(redis_key, to_json(cache))

        cache
    end
  end

end