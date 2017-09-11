defmodule AcsStats.Search do 
  use Utils.LogAlias
  require Elasticsearch

  import Ecto.Query, warn: false

  def search_app_user(query) do
    case Elasticsearch.search(%{index: "acs", type: "app_users", query: query, params: %{timeout: "1m"}}) do
      {:ok, %{hits: %{hits: hits, total: total}}} ->
        app_users = Enum.map(hits, fn(%{_id: _id, _source: %{} = app_user}) -> app_user end)
        {:ok, total, app_users}

      error ->
        raise("search app user failed: #{inspect error}")
   end
  end

end