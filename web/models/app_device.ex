defmodule Acs.AppDevice do
  use Acs.Web, :model

  schema "app_devices" do
    field :sdk, :string

    field :active_minutes, :integer, default: 0
    field :pay_amount, :integer, default: 0
    field :last_pay_at, :naive_datetime

    belongs_to :app, Acs.App, type: :string
    belongs_to :device, Acs.Device, type: :string

    timestamps()
  end

  @sdks Application.get_env(:acs, :sdks, [])

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:sdk, :active_minutes, :pay_amount, :last_pay_at, :app_id, :device_id])
    |> validate_required([:sdk])
    |> validate_inclusion(:sdk, @sdks)
  end
end
