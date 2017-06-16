defmodule Acs.Stats.DailyReport do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Stats.DailyReport


  schema "stats_daily_reports" do
    field :app_id, :string
    field :date, :date
    field :platform, :string

    field :dau, :integer, default: 0
    field :danu, :integer, default: 0
    field :dapu, :integer, default: 0
    field :danpu, :integer, default: 0
    field :dad, :integer, default: 0
    field :dand, :integer, default: 0
    field :total_fee, :integer, default: 0

    # has many retention data
    # has many timing data

    timestamps()
  end

  @doc false
  def changeset(%DailyReport{} = daily_report, attrs) do
    daily_report
    |> cast(attrs, [:app_id, :date, :platform, :dau, :danu, :dapu, :danpu, :dad, :dand, :total_fee])
    |> validate_required([:app_id, :date, :platform])
  end
end
