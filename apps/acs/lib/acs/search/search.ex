defmodule Acs.Search do 
  use Utils.LogAlias
  require Elasticsearch

  alias  Acs.Repo
  import Ecto.Query, warn: false

  alias Acs.Apps.AppOrder

  def search_app_order(app_id, keyword, page, records_per_page) do 
    query = %{
      query: %{
        bool: %{
          must: [
            %{term: %{app_id: app_id}}
          ],
          should: [
            %{term: %{user_id: keyword}},
            %{term: %{goods_id: keyword}},
            %{term: %{device_id: keyword}},
            %{term: %{app_user_id: keyword}},
            %{term: %{sdk_user_id: keyword}},
            %{match: %{cp_order_id: keyword}},
            %{match: %{transaction_id: keyword}},
          ],
          minimum_should_match: 1,
          boost: 1.0,
        },
      },
      sort: %{inserted_at: %{order: :desc}},
      from: (page - 1) * records_per_page,
      size: records_per_page,
    }

    case Elasticsearch.search(%{index: "acs", type: "orders", query: query, params: %{timeout: "1m"}}) do
      {:ok, %{hits: %{hits: hits, total: total}}} ->
        ids = Enum.map(hits, &(&1._id))

        query = from order in AppOrder,
                  select: order,
                  where: order.id in ^ids,
                  order_by: [desc: order.inserted_at]

        Repo.all(query)

      error ->
        error "search orders failed: #{inspect error, pretty: true}"
        []
    end    
  end

end