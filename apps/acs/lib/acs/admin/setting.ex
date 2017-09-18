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

    belongs_to :app, Acs.Apps.App, type: :string

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%Setting{} = setting, attrs) do
    setting
    |> cast(attrs, [:name, :value, :memo, :active, :group, :app_id])
    |> validate_required([:name, :value, :active, :memo, :group, :app_id])
  end
end
