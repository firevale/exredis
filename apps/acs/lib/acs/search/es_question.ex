defmodule Acs.Search.ESQuestion do 
    require Elasticsearch

    def index(contact) do
      Elasticsearch.index(%{
        index: "customer_service",
        type: "questions",
        doc: contact,
        params: nil,
        id: contact.id
      })
    end

end