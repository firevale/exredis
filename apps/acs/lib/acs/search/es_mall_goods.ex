defmodule Acs.Search.ESMallGoods do 
  require Elasticsearch
  alias Acs.Malls.MallGoods

  def index(%MallGoods{} = goods) do 
    
    Elasticsearch.index(%{
      index: "mall",
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