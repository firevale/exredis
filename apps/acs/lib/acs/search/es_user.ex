defmodule Acs.Search.ESUser do 
    require Elasticsearch
    alias Acs.Accounts.User

    def index(%User{} = user) do
      Elasticsearch.index(%{
        index: "acs",
        type: "user",
        doc: user,
        id: user.id
      })
    end

end