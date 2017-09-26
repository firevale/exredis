defmodule Acs.Search.ESOrder do 
  use Utils.LogAlias

  require Elasticsearch

  alias Acs.Apps.AppOrder
  alias Acs.Apps.AppGoods
  alias Acs.Cache.CachedAppGoods

  def index(%AppOrder{} = order) do 
    with goods = %AppGoods{} <- CachedAppGoods.get(order.goods_id) 
    do 
      Elasticsearch.index(%{
        index: "acs",
        type: "app_orders",
        doc: %{
          app_id: order.app_id,
          user_id: order.user_id,
          app_user_id: order.app_user_id,
          sdk_user_id: order.sdk_user_id,
          goods_id: order.goods_id,
          device_id: order.device_id,
          cp_order_id: order.cp_order_id,
          transaction_id: order.transaction_id,
          inserted_at: Timex.format!(order.inserted_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+00:00"),
        },
        id: order.id
      })   
    else 
      _ ->
        error "goods not found #{order.goods_id}"
    end
  end

end