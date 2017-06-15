defmodule Acs.Stats.DailyReport do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Stats.DailyReport


  schema "stats_daily_reports" do
    field :date, :date
    field :platform, :string

    timestamps()
  end

  @doc false
  def changeset(%DailyReport{} = daily_report, attrs) do
    daily_report
    |> cast(attrs, [:date, :platform])
    |> validate_required([:date, :platform])
  end
end
