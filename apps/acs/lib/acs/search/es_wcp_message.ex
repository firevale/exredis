defmodule Acs.Search.ESWcpMessage do 
    require Elasticsearch
    alias Acs.Wcp.AppWcpMessage

    def index(%{} = message) do
      Elasticsearch.index(%{
        index: "wcp",
        type: "messages",
        doc: message,
        id: nil,
      })
    end

end