defmodule Acs.Forums.Forum do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Forums.Forum

  @derive {Poison.Encoder, except: [:app, :__meta__]}
  @primary_key false
  schema "forums" do
    field :id, :string, primary_key: true
    field :title, :string
    field :active, :boolean, default: true
    field :icon, :string

    belongs_to :app, Acs.Apps.App, type: :string
    has_many :sections, Acs.Forums.ForumSection, references: :id

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%Forum{} = forum, attrs) do
    forum
    |> cast(attrs, [:id, :title,:active, :app_id, :icon])
    |> validate_required([:id, :title, :active, :app_id])
    |> foreign_key_constraint(:app_id)
  end
end
