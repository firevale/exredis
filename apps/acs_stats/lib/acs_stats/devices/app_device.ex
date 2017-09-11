defmodule AcsStats.Devices.AppDevice do
  use Ecto.Schema
  import Ecto.Changeset
  alias AcsStats.Devices.AppDevice


  schema "app_devices" do
    field :active_seconds, :integer, default: 0
    field :pay_amount, :integer, default: 0
    field :last_active_at, :utc_datetime
    field :first_paid_at, :utc_datetime
    field :last_paid_at, :utc_datetime
    field :reg_date, :date

    field :platform, :string 
    field :sdk, :string

    field :app_id, :string
    belongs_to :device, AcsStats.Devices.Device, type: :string

    has_many :daily_activities, AcsStats.Devices.AppDeviceDailyActivity

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%AppDevice{} = app_device, attrs) do
    app_device
    |> cast(attrs, [:active_seconds, :pay_amount, :last_active_at, :first_paid_at, :last_paid_at, :reg_date, :app_id, :device_id, :platform, :sdk])
    |> validate_number(:pay_amount, greater_than_or_equal_to: 0, message: "pay_amount should be greater than or equal to 0")
    |> validate_number(:active_seconds, greater_than_or_equal_to: 0, message: "active_seconds should be greater than or equal to 0")
    |> validate_inclusion(:platform, ~w(ios android wp8), message: "unknown platform")
  end
end
