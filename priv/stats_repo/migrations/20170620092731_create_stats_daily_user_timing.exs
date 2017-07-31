defmodule Acs.Repo.Migrations.CreateAcs.Stats.DailyUserTiming do
  use Ecto.Migration

  def change do
    create table(:stats_daily_user_timings) do
      add :nmin, :integer
      add :counter, :integer
      add :report_id, references(:stats_daily_reports, on_delete: :delete_all)

      timestamps()
    end

    create index(:stats_daily_user_timings, [:report_id])
    create index(:stats_daily_user_timings, [:nmin, :report_id], unique: true)
  end
end
