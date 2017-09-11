defmodule Acs.Search.ESPMallGoods do 
  require Elasticsearch
  alias Acs.PMalls.PMallGoods

  def index(%PMallGoods{} = goods) do 
    
    Elasticsearch.index(%{
      index: "pmall",
      type: "goods",
      doc: %{
        id: goods.id,
        name: goods.name,
        app_id: goods.app_id,
        description: goods.description,
        inserted_at: Timex.format!(goods.inserted_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+00:00"),
      },
      params: nil,
      id: goods.id
    })
    
  end


end