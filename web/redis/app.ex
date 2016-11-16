defmodule Acs.RedisApp do
  require Redis
  # require Utils
  # require Logger

  alias   Acs.Repo
  import  Ecto
  import  Ecto.Query

  alias   Acs.App

  @app_cache_key     "fvac.app_cache"

  def find(id) when is_bitstring(id) do 
    redis_key = "#{@app_cache_key}.#{id}"

    case Redis.get(redis_key) do 
      :undefined ->
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
            Redis.set(redis_key, app |> :erlang.term_to_binary |> Base.encode64)
            app 
        end
      raw -> 
        raw |> Base.decode64! |> :erlang.binary_to_term
    end
  end
end