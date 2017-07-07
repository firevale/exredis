defmodule Acs.RedisApp do
  require Redis

  alias   Acs.Repo
  alias   LogAlias
  import  Ecto.Query

  alias   Acs.App
  alias   Acs.AppSdkBinding
  alias   Acs.AppGoods
  alias   Acs.AppGoodsProductId
  alias   Acs.AppSdkPaymentCallback

  require Cachex

  ########################################
  defstruct id: 0,
            secret: nil,
            name: nil,
            token_ttl: 604800,
            currency: "CNY",
            payment_callback: nil,
            chaoxin_group_id: nil,
            cs_phone_number: nil,
            active: true,
            has_forum: false,
            has_mall: false,
            restrict_login: false,
            can_assign_code: false,
            obtain_code_url: nil,
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
            sdk_payment_callbacks: %{},
            forum_id: nil,
            mall_id: nil,
            goods: %{}

  use     Utils.Jsonable

  @app_cache_key     "fvac.app_cache"

  def find("account-center"), do: nil

  def find(id) when is_bitstring(id) do
    key = "#{@app_cache_key}.#{id}"

    Cachex.get!(:default, key, fallback: fn(redis_key) ->    
      case Redis.get(redis_key) do
        :undefined -> 
          case refresh(id, false) do 
            nil -> {:ignore, nil}
            app -> {:commit, app}
          end
        raw ->
          {:commit, raw |> from_json}
      end
    end)
  end

  def refresh(id, force_update \\ true) when is_bitstring(id) do
    redis_key = "#{@app_cache_key}.#{id}"

    if force_update do 
      Cachex.del(:default, redis_key)
    end

    query = from app in App,
              left_join: bindings in assoc(app, :sdk_bindings),
              left_join: goods in assoc(app, :goods),
              left_join: callbacks in assoc(app, :sdk_payment_callbacks),
              left_join: goods_product_ids in assoc(goods, :product_ids),
              left_join: forum in assoc(app, :forum),
              left_join: mall in assoc(app, :mall),
              where: app.id == ^id,
              select: app,
              preload: [sdk_bindings: bindings,
                        forum: forum,
                        mall: mall,
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

        payment_callbacks = app.sdk_payment_callbacks |> Enum.map(fn(%AppSdkPaymentCallback{platform: platform, sdk: sdk, payment_callback: callback}) ->
          {"#{platform}-#{sdk}", callback}
        end) |> Enum.into(%{})

        #Logger.debug "mysql app: #{inspect app, pretty: true}"

        cache = %__MODULE__{
          id: app.id,
          secret: app.secret,
          name: app.name,
          currency: app.currency,
          token_ttl: app.token_ttl,
          payment_callback: app.payment_callback,
          chaoxin_group_id: app.chaoxin_group_id,
          cs_phone_number: app.cs_phone_number,
          active: app.active,
          has_forum: app.has_forum,
          has_mall: app.has_mall,
          restrict_login: app.restrict_login,
          can_assign_code: app.can_assign_code,
          obtain_code_url: app.obtain_code_url,
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
          sdk_payment_callbacks: payment_callbacks,
          forum_id: if is_nil(app.forum) do nil else app.forum.id end,
          mall_id: if is_nil(app.mall) do nil else app.mall.id end,
          goods: goods
        }

        Redis.set(redis_key, to_json(cache))

        cache
    end
  end

  def update(id, active) when is_bitstring(id) do
    case Repo.get(App, id) do
      nil -> nil

      %App{} = app ->
        App.changeset(app, %{has_mall: active}) |> Repo.update!
        refresh(id)
        :ok
    end
  end

  def refreshForumActive(id, active) when is_bitstring(id) do
    case Repo.get(App, id) do
      nil -> nil

      %App{} = app ->
        App.changeset(app, %{has_forum: active}) |> Repo.update!
        refresh(id)
        :ok
    end
  end
end
