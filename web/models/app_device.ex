defmodule Acs.AppDevice do
  use Acs.Web, :model

  schema "app_devices" do

    field :active_seconds, :integer, default: 0
    field :pay_amount, :integer, default: 0
    field :last_pay_at, :naive_datetime
    field :create_date, :date

    belongs_to :app, Acs.App, type: :string
    belongs_to :device, Acs.Device, type: :string
    field :zone_id, :string

    timestamps()
  end

  @sdks Application.get_env(:acs, :sdks, [])

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct |> cast(params, [:zone_id, :active_seconds, :pay_amount, :last_pay_at, :create_date, :app_id, :device_id])
           |> validate_number(:pay_amount, greater_than_or_equal_to: 0, message: "pay_amount should be greater than or equal to 0")
           |> validate_number(:active_seconds, greater_than_or_equal_to: 0, message: "active_seconds should be greater than or equal to 0")
  end
end
