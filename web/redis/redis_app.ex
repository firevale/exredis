defmodule Acs.RedisApp do
  require Redis
  
  alias   Acs.Repo
  import  Ecto.Query

  alias   Acs.App
  alias   Acs.AppSdkBinding
  alias   Acs.AppGoods
  alias   Acs.AppGoodsProductId
  
  require Logger

  ########################################
  defstruct id: 0,
            secret: nil,
            name: nil,
            token_ttl: 604800,
            currency: "CNY",
            payment_callback: nil,
            chaoxin_group_id: nil,
            cs_phone_number: nil,
            forum_name: nil,
            forum_url: nil,
            baidu_tieba_name: nil,
            baidu_tieba_url: nil,
            weibo_url: nil,
            weibo_name: nil,
            website_name: nil,
            website_url: nil,
            public_weixin_name: nil,
            public_weixin_url: nil,
            sdk_bindings: %{},
            goods: %{}

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
        sdk_bindings = app.sdk_bindings |> Enum.map(fn(%AppSdkBinding{sdk: sdk, binding: binding}) ->
          {sdk |> String.to_atom, binding} 
        end) |> Enum.into(%{})

        goods = app.goods |> Enum.map(fn(%AppGoods{} = goods) -> 
          product_ids = goods.product_ids |> Enum.map(fn(%AppGoodsProductId{sdk: sdk, product_id: product_id}) -> 
            {sdk |> String.to_atom, product_id}
          end) |> Enum.into(%{})
          {goods.id, %{id: goods.id, 
                       name: goods.name, 
                       description: goods.description, 
                       price: goods.price, 
                       icon: goods.icon,
                       product_ids: product_ids}}
        end) |> Enum.into(%{})

        Logger.debug "mysql app: #{inspect app, pretty: true}"

        cache = %__MODULE__{
          id: app.id,
          secret: app.secret,
          name: app.name,
          currency: app.currency,
          token_ttl: app.token_ttl,
          payment_callback: app.payment_callback,
          chaoxin_group_id: app.chaoxin_group_id,
          cs_phone_number: app.cs_phone_number,
          forum_name: app.forum_name,
          forum_url: app.forum_url,
          baidu_tieba_name: app.baidu_tieba_name,
          baidu_tieba_url: app.baidu_tieba_url,
          weibo_url: app.weibo_url,
          weibo_name: app.weibo_name,
          website_name: app.website_name,
          website_url: app.website_url,
          public_weixin_name: app.public_weixin_name,
          public_weixin_url: app.public_weixin_url, 
          sdk_bindings: sdk_bindings,
          goods: goods
        }

        Redis.set(redis_key, to_json(cache))

        cache
    end
  end

end