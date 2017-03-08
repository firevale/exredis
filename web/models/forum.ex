defmodule Acs.Forum do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:app, :__meta__]}

  schema "forums" do
    field :title, :string
    field :active, :boolean, default: true
    field :created_at, :naive_datetime
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
    |> cast(params, [:title,:active, :created_at, :app_id, :icon])
    |> validate_required([:title, :active, :created_at, :app_id])
    |> foreign_key_constraint(:app_id)
  end
end
