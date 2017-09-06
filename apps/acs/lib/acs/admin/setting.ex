defmodule Acs.Admin.Setting do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Admin.Setting

  @derive {Poison.Encoder, except: [:__meta__]}
  
  schema "admin_settings" do
    field :name, :string
    field :value, :binary
    field :group, :string
    field :memo,  :string
    field :active, :boolean, default: true

    timestamps()
  end

  @doc false
  def changeset(%Setting{} = setting, attrs) do
    setting
    |> cast(attrs, [:name, :value, :memo, :active, :group])
    |> validate_required([:name, :value, :active, :memo, :group])
  end
end
