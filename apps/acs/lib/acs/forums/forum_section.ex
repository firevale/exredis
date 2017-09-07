defmodule Acs.Forums.ForumSection do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Forums.ForumSection

  @derive {Poison.Encoder, except: [:forum, :__meta__]}
  schema "forums_sections" do
    field :title, :string
    field :sort, :integer
    field :active, :boolean, default: true

    belongs_to :forum, Acs.Forums.Forum, type: :integer

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%ForumSection{} = forum_section, attrs) do
    forum_section
    |> cast(attrs, [:title, :sort, :forum_id, :active])
    |> validate_required([:title, :sort, :forum_id, :active])
    |> foreign_key_constraint(:form_id)
  end
end
