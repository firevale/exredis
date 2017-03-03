defmodule Acs.ForumSection do
  use Acs.Web, :model

  schema "forums_sections" do
    field :title, :string
    field :sort, :integer
    field :created_at, :naive_datetime

    belongs_to :forum, Acs.Forum

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :sort, :created_at, :forum_id])
    |> validate_required([:title, :sort, :created_at, :forum_id])
    |> foreign_key_constraint(:form_id)
  end
end
