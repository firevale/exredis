defmodule Acs.Question do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:app, :user,  :__meta__]}
  
  schema "questions" do
    field :title, :string
    field :answer, :string
    field :is_hot, :boolean, default: false
    field :active, :boolean, default: true
    field :sort_index, :integer, default: 0
    field :reply_at, :utc_datetime
    field :platform, :string

    belongs_to :user, Acs.User, type: :integer
    belongs_to :app, Acs.App, type: :string
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :answer, :is_hot, :active, :sort_index, :reply_at, :platform, :user_id, :app_id])
    |> validate_required([:title, :app_id, :user_id])
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:app_id)
  end

  def init_mapping() do
    unless Elasticsearch.is_index?("customer_service") do
         settings = %{
           number_of_shards: 5,
           number_of_replicas: 1,
         }

         mapping = %{
           properties: %{
             id: %{type: :integer},
             app_id: %{type: :keyword},
             platform: %{type: :integer},
             title: %{type: :text, analyzer: :ik_smart},
             answer: %{type: :text, analyzer: :ik_smart},
             active: %{type: :boolean},
             is_hot: %{type: :boolean},
             sort_index: %{type: :integer},
             user_id: %{type: :integer},
             inserted_at: %{type: :date},
             updated_at: %{type: :date},
             reply_at: %{type: :date}
           }
         }

         Elasticsearch.create_index("customer_service", settings, %{
           questions: mapping
         })
    end
  end
end
