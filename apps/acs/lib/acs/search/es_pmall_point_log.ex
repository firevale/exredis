defmodule Acs.Search.ESPMallPointLog do 
  require Elasticsearch

  def index(point_log) do 
    Elasticsearch.index(%{
      index: "pmall",
      type: "point_logs",
      params: %{parent: point_log.wcs_user_id},
      doc: point_log,
      id: nil,
    })
  end
end