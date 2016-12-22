defmodule Acs.AppDeviceDailyActivity do
  use Acs.Web, :model

  schema "app_device_daily_activities" do
    field :date, :date
    field :active_seconds, :integer, default: 0
    field :pay_amount, :integer, default: 0
    belongs_to :app_device, Acs.AppDevice

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:date, :active_seconds, :pay_amount, :app_device_id])
    |> validate_required([:date, :app_device_id])
  end
end
