defmodule Acs.Stats.AppDeviceDailyActivity do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Stats.AppDeviceDailyActivity

  schema "app_device_daily_activities" do
    field :date, :date

    field :active_seconds, :integer, default: 0
    field :pay_amount, :integer, default: 0
    belongs_to :app_device, Acs.Stats.AppDevice

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(%AppDeviceDailyActivity{} = app_device_daily_activity, attrs) do
    app_device_daily_activity
    |> cast(attrs, [:date, :active_seconds, :pay_amount, :app_device_id])
    |> validate_required([:date, :app_device_id])
  end  
end
