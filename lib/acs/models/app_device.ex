defmodule Acs.AppDevice do
  use Acs.Web, :model

  schema "app_devices" do
    field :active_seconds, :integer, default: 0
    field :pay_amount, :integer, default: 0
    field :last_active_at, :utc_datetime
    field :last_paid_at, :utc_datetime
    field :reg_date, :date

    field :app_id, :string
    field :zone_id, :string
    belongs_to :device, Acs.Stats.Device, type: :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:active_seconds, :pay_amount, :last_active_at, :last_paid_at, :reg_date, :zone_id, :app_id, :device_id])
    |> validate_number(:pay_amount, greater_than_or_equal_to: 0, message: "pay_amount should be greater than or equal to 0")
    |> validate_number(:active_seconds, greater_than_or_equal_to: 0, message: "active_seconds should be greater than or equal to 0")
  end
end
