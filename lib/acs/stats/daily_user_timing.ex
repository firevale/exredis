defmodule Acs.Stats.DailyUserTiming do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Stats.DailyUserTiming


  schema "stats_daily_user_timings" do
    field :counter, :integer
    field :nmin, :integer
    belongs_to :report, Acs.Stats.DailyReport
    timestamps()
  end

  @doc false
  def changeset(%DailyUserTiming{} = daily_user_timing, attrs) do
    daily_user_timing
    |> cast(attrs, [:nmin, :counter])
    |> validate_required([:nmin, :counter])
  end
end
