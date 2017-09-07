defmodule AcsStats.Devices.AppDeviceDailyActivity do
  use Ecto.Schema
  import Ecto.Changeset
  alias AcsStats.Devices.AppDeviceDailyActivity


  schema "app_device_daily_activities" do
    field :date, :date
    
    field :active_seconds, :integer, default: 0
    field :pay_amount, :integer, default: 0
    belongs_to :app_device, AcsStats.Devices.AppDevice

    timestamps()
  end

  @doc false
  def changeset(%AppDeviceDailyActivity{} = app_device_daily_activity, attrs) do
    app_device_daily_activity
    |> cast(attrs, [:date, :active_seconds, :pay_amount, :app_device_id])
    |> validate_required([:date, :app_device_id])
  end
end
