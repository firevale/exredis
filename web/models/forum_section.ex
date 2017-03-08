defmodule Acs.ForumSection do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:forum, :__meta__]}

  schema "forums_sections" do
    field :title, :string
    field :sort, :integer
    field :created_at, :naive_datetime
    field :active, :boolean, default: true

    belongs_to :forum, Acs.Forum

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :sort, :created_at, :forum_id, :active])
    |> validate_required([:title, :sort, :created_at, :forum_id, :active])
    |> foreign_key_constraint(:form_id)
  end
end
