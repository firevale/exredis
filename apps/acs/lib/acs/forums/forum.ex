defmodule Acs.Forums.Forum do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Forums.Forum

  @derive {Poison.Encoder, except: [:app, :__meta__]}
  schema "forums" do
    field :title, :string
    field :active, :boolean, default: true
    field :icon, :string

    belongs_to :app, Acs.Apps.App, type: :string
    has_many :sections, Acs.Forums.ForumSection, references: :id

    timestamps()
  end

  @doc false
  def changeset(%Forum{} = forum, attrs) do
    forum
    |> cast(attrs, [:title,:active, :app_id, :icon])
    |> validate_required([:title, :active, :app_id])
    |> foreign_key_constraint(:app_id)
  end
end
