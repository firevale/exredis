defmodule AcsStats.Stats.DailyUserRetention do
  use Ecto.Schema
  import Ecto.Changeset
  alias AcsStats.Stats.DailyUserRetention


  schema "stats_daily_user_retentions" do
    field :nday, :integer
    field :retention, :integer
    belongs_to :report, Acs.Stats.DailyReport

    timestamps()
  end

  @doc false
  def changeset(%DailyUserRetention{} = daily_user_retention, attrs) do
    daily_user_retention
    |> cast(attrs, [:nday, :retention, :report_id])
    |> validate_required([:nday, :retention, :report_id])
  end
end
