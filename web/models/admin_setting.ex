defmodule Acs.AdminSetting do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:__meta__]}

  schema "settings" do
    field :name, :string
    field :value, :binary
    field :group, :string
    field :active, :boolean, default: true

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :value, :active, :group])
    |> validate_required([:name, :value, :active, :group])
  end
end
