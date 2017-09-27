defmodule Acs.Search.ESOrder do 
  use Utils.LogAlias

  require Elasticsearch

  alias Acs.Apps.AppOrder
  alias Acs.Apps.AppGoods
  alias Acs.Cache.CachedAppGoods

  def index(%AppOrder{goods_id: nil}), do: nil
  def index(%AppOrder{paid_at: nil}), do: nil
  def index(%AppOrder{} = order) do 
    with goods = %AppGoods{} <- CachedAppGoods.get(order.goods_id)
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
          currency: order.currency,
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
          inserted_at: order.inserted_at,
          paid_at: order.paid_at,
          delivered_at: order.deliver_at,
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