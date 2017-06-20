defmodule Acs.Stats.DailyDeviceTiming do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Stats.DailyDeviceTiming


  schema "stats_daily_device_timings" do
    field :counter, :integer
    field :nmin, :integer
    belongs_to :report, Acs.Stats.DailyReport
    timestamps()
  end

  @doc false
  def changeset(%DailyDeviceTiming{} = daily_device_timing, attrs) do
    daily_device_timing
    |> cast(attrs, [:nmin, :counter])
    |> validate_required([:nmin, :counter])
  end
end
