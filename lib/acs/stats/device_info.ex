defmodule Acs.Stats.DeviceInfo do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Stats.DeviceInfo


  @primary_key false
  schema "device_infos" do
    field :id, :string, primary_key: true
    field :alias, :string
    field :total_mem_size, :integer
    field :cpu_arch, :string

    timestamps()
  end
  
  use Utils.Redisable

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(%DeviceInfo{} = device_info, attrs \\ %{}) do
    device_info
    |> cast(attrs, [:id, :alias, :total_mem_size, :cpu_arch])
    |> validate_required([:id])
  end
end
