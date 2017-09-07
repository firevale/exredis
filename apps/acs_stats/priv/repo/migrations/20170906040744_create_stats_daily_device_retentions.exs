defmodule AcsStats.Repo.Migrations.CreateStatsDailyDeviceRetentions do
  use Ecto.Migration

  def change do
    create table(:stats_daily_device_retentions) do
      add :nday, :integer
      add :retention, :integer
      add :report_id, references(:stats_daily_reports, on_delete: :delete_all)

      timestamps()
    end

    create index(:stats_daily_device_retentions, [:report_id])
    create unique_index(:stats_daily_device_retentions, [:nmin, :report_id])
  end
end

