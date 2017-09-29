defmodule Acs.Search.ESWcsUser do 
  require Elasticsearch
  alias Acs.Wcs.WcsUser

  def index(%WcsUser{} = wcs_user) do 
    
    Elasticsearch.index(%{
      index: "pmall",
      type: "wcs_users",
      doc: wcs_user,
      id: wcs_user.id
    })
    
  end


end