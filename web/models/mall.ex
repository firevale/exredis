defmodule Acs.Mall do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:app, :__meta__]}

  schema "malls" do
    field :title, :string
    field :active, :boolean, default: false
    field :icon, :string

    belongs_to :app, Acs.App, type: :string
    has_many :goods, Acs.MallGoods, references: :id

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :icon, :active])
    |> validate_required([:title])
    |> foreign_key_constraint(:app_id)
  end
end
