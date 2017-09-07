defmodule Acs.Search.ESOrder do 
  require Elasticsearch
  alias Acs.Apps.AppOrder

  def index(%AppOrder{} = order) do 
    Elasticsearch.index(%{
      index: "acs",
      type: "orders",
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
  end


end