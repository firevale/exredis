defmodule Acs.Malls.Mall do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Malls.Mall

  @derive {Poison.Encoder, except: [:app, :__meta__]}
  schema "malls" do
    field :title, :string
    field :active, :boolean, default: false
    field :icon, :string

    belongs_to :app, Acs.Apps.App, type: :string

    timestamps()
  end

  @doc false
  def changeset(%Mall{} = mall, attrs) do
    mall
    |> cast(attrs, [:title, :icon, :active, :app_id])
    |> validate_required([:title, :app_id])
    |> foreign_key_constraint(:app_id)
  end
end
