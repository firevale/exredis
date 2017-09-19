defmodule AcsStats.Devices.Device do
  use Ecto.Schema
  import Ecto.Changeset
  alias AcsStats.Devices.Device


  @primary_key false
  schema "devices" do
    field :id, :string, primary_key: true
    field :model, :string
    field :platform, :string
    field :os, :string

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%Device{} = device, attrs) do
    device
    |> cast(attrs, [:id, :model, :platform, :os])
    |> validate_required([:model, :platform])
  end
end
