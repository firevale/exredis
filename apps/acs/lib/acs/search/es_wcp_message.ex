defmodule Acs.Search.ESWcpMessage do 
    require Elasticsearch
    alias Acs.Wcp.AppWcpMessage

    def index(%AppWcpMessage{} = message) do
      Elasticsearch.index(%{
        index: "wcp",
        type: "messages",
        doc: message,
        id: message.id
      })
    end

end