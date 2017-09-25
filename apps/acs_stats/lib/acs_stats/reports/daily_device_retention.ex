defmodule AcsStats.Reports.DailyDeviceRetention do
  use Ecto.Schema
  import Ecto.Changeset
  alias AcsStats.Reports.DailyDeviceRetention


  schema "stats_daily_device_retentions" do
    field :nday, :integer
    field :retention, :integer

    belongs_to :report, AcsStats.Reports.DailyReport

    timestamps()
  end

  @doc false
  def changeset(%DailyDeviceRetention{} = daily_device_retention, attrs) do
    daily_device_retention
    |> cast(attrs, [:nday, :retention, :report_id])
    |> validate_required([:nday, :retention, :report_id])
    |> foreign_key_constraint(:report_id)
  end
end
