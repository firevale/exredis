defmodule Acs.AppWcpMessage do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:app, :__meta__]}

  schema "app_wcp_messages" do
    field :from, :string
    field :to, :string
    field :msg_type, :string
    field :content, :binary
    field :create_time, :integer

    belongs_to :app, Acs.App, type: :string

    timestamps()
  end

  use Utils.Redisable

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:from, :to, :msg_type, :content, :create_time, :app_id])
    |> validate_required([:from, :to, :msg_type, :content])
  end

  def init_mapping() do
    unless Elasticsearch.is_type?("wcp", "messages") do
       mapping = %{
         properties: %{
           app_id: %{type: :keyword},
           msg_type: %{type: :keyword},
           from: %{ properties: %{
             openid: %{type: :keyword},
             nickname:  %{type: :text, analyzer: :ik_smart},
           }},
           to: %{ properties: %{
            openid: %{type: :keyword},
            nickname:  %{type: :text, analyzer: :ik_smart},
          }},
           admin_user: %{ properties: %{
            email: %{type: :keyword},
            nickname:  %{type: :text, analyzer: :ik_smart},
          }},
           content: %{type: :text, analyzer: :ik_smart},
           inserted_at: %{type: :date},
         }
       }

       Elasticsearch.put_mapping(%{index: "wcp", type: "messages", mapping: mapping, params: nil})
     end
   end

   def index(message) when is_map(message) do
      Elasticsearch.index(%{
        index: "wcp",
        type: "messages",
        doc: message,
        params: nil,
        id: nil
      })
   end

   def search(query) do
     case Elasticsearch.search(%{index: "wcp", type: "messages", query: query, params: %{timeout: "1m"}}) do
        {:ok, %{hits: %{hits: hits, total: total}}} ->
          messages = 
            Enum.map(hits, fn(%{_id: _id, _source: %{} = message}) -> message end)
          {:ok, total, messages}
        error ->
          error "search orders failed: #{inspect error, pretty: true}"
          throw(error)
     end
   end
end
