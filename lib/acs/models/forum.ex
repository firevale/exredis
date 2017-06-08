defmodule Acs.Forum do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:app, :__meta__]}

  schema "forums" do
    field :title, :string
    field :active, :boolean, default: true
    field :icon, :string

    belongs_to :app, Acs.App, type: :string
    has_many :sections, Acs.ForumSection, references: :id

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title,:active, :app_id, :icon])
    |> validate_required([:title, :active, :app_id])
    |> foreign_key_constraint(:app_id)
  end

  def init_mapping() do
    unless Elasticsearch.is_index?("forum") do
        settings = %{
        number_of_shards: 5,
        number_of_replicas: 1,
        }

        posts_mapping = %{
        properties: %{
            id: %{type: :integer},
            forum_id: %{type: :integer},
            user_id: %{type: :integer},
            section_id: %{type: :integer},
            title: %{type: :text, analyzer: :ik_smart},
            content: %{type: :text, analyzer: :ik_smart},
            is_top: %{type: :boolean},
            is_hot: %{type: :boolean},
            is_vote: %{type: :boolean},
            reads: %{type: :integer},
            comms: %{type: :integer},
            inserted_at: %{type: :date},
            last_reply_at: %{type: :date},
            active: %{type: :boolean},
            has_pic: %{type: :boolean}
        }
        }

        Elasticsearch.create_index("forum", settings, %{
        posts: posts_mapping
        })
    end
  end
end
