defmodule AcsStats.Reports.DailyUserRetention do
  use Ecto.Schema
  import Ecto.Changeset
  alias AcsStats.Reports.DailyUserRetention


  schema "stats_daily_user_retentions" do
    field :nday, :integer
    field :retention, :integer
    belongs_to :report, AcsStats.Reports.DailyReport

    timestamps()
  end

  @doc false
  def changeset(%DailyUserRetention{} = daily_user_retention, attrs) do
    daily_user_retention
    |> cast(attrs, [:nday, :retention, :report_id])
    |> validate_required([:nday, :retention, :report_id])
    |> foreign_key_constraint(:report_id)
  end
end
