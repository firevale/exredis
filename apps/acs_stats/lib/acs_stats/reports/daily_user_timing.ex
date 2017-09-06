defmodule AcsStats.Reports.DailyUserTiming do
  use Ecto.Schema
  import Ecto.Changeset
  alias AcsStats.Reports.DailyUserTiming


  schema "stats_daily_user_timings" do
    field :counter, :integer
    field :nmin, :integer
    belongs_to :report, AcsStats.Reports.DailyReport

    timestamps()
  end

  @doc false
  def changeset(%DailyUserTiming{} = daily_user_timing, attrs) do
    daily_user_timing
    |> cast(attrs, [:nmin, :counter, :report_id])
    |> validate_required([:nmin, :counter, :report_id])
  end
end
