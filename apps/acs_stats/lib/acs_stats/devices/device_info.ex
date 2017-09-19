defmodule AcsStats.Devices.DeviceInfo do
  use Ecto.Schema
  import Ecto.Changeset
  alias AcsStats.Devices.DeviceInfo

  @primary_key false
  schema "device_infos" do
    field :id, :string, primary_key: true
    field :alias, :string
    field :total_mem_size, :integer
    field :cpu_arch, :string

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%DeviceInfo{} = device_info, attrs) do
    device_info
    |> cast(attrs, [:id, :alias, :total_mem_size, :cpu_arch])
    |> validate_required([:id])
  end
end
