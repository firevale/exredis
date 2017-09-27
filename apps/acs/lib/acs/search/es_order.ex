defmodule Acs.Search.ESOrder do 
  use Utils.LogAlias

  require Elasticsearch

  alias Acs.Apps.App
  alias Acs.Apps.AppOrder
  alias Acs.Apps.AppGoods
  alias Acs.Cache.CachedAppGoods
  alias Acs.Cache.CachedApp

  def index(%AppOrder{} = order) do 
    with goods = %AppGoods{} <- CachedAppGoods.get(order.goods_id),
         app = %App{} <- CachedApp.get(order.app_id)
    do 
      Elasticsearch.index(%{
        index: "acs",
        type: "app_orders",
        params: %{parent: order.user_id},
        doc: %{
          app_id: order.app_id,
          user_id: order.user_id,
          status: order.status,
          goods_id: order.goods_id,
          goods_name: goods.name,
          goods_price: goods.price,
          goods_icon: goods.icon,
          currency: app.currency,
          fee: order.fee,
          transaction_currency: order.transaction_currency,
          device_id: order.device_id,
          cp_order_id: order.cp_order_id,
          transaction_id: order.transaction_id,
          app_user_id: order.app_user_id,
          zone_id: order.zone_id,
          platform: order.platform,
          sdk: order.sdk,
          sdk_user_id: order.sdk_user_id,
          inserted_at: Timex.format!(order.inserted_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+00:00"),
          paid_at: Timex.format!(order.paid_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+00:00"),
          delivered_at: Timex.format!(order.delivered_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+00:00"),
          cp_result: order.cp_result,
        },
        id: order.id
      })   
    else 
      _ ->
        error "goods not found #{order.goods_id}"
    end
  end

end