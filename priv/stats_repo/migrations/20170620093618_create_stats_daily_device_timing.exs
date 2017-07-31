defmodule Acs.Repo.Migrations.CreateAcs.Stats.DailyDeviceTiming do
  use Ecto.Migration

  def change do
    create table(:stats_daily_device_timings) do
      add :nmin, :integer
      add :counter, :integer
      add :report_id, references(:stats_daily_reports, on_delete: :delete_all)

      timestamps()
    end

    create index(:stats_daily_device_timings, [:report_id])
    create index(:stats_daily_device_timings, [:nmin, :report_id], unique: true)
  end
end
