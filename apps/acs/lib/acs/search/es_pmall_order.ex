defmodule Acs.Search.ESPMallOrder do 
  require Elasticsearch
  alias Acs.PMalls.PMallOrder

  def index(%PMallOrder{} = order) do 
    
    Elasticsearch.index(%{
      index: "pmall",
      type: "orders",
      doc: %{
        id: order.id,
        goods_name: order.goods_name,
        app_id: order.app_id,
        user_ip: order.user_ip,
        memo: order.memo,
        transaction_id: order.transaction_id,
        address: %{
          name: order.address.name,
          mobile: order.address.mobile,
        },
        inserted_at: Timex.format!(order.inserted_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+00:00"),
      },
      params: nil,
      id: order.id
    })
    
  end


end