defmodule AcsStats.Reports.DailyDeviceTiming do
  use Ecto.Schema
  import Ecto.Changeset
  alias AcsStats.Reports.DailyDeviceTiming


  schema "stats_daily_device_timings" do
    field :counter, :integer
    field :nmin, :integer
    belongs_to :report, AcsStats.Reports.DailyReport

    timestamps()
  end

  @doc false
  def changeset(%DailyDeviceTiming{} = daily_device_timing, attrs) do
    daily_device_timing
    |> cast(attrs, [:nmin, :counter, :report_id])
    |> validate_required([:nmin, :counter, :report_id])
  end
end
