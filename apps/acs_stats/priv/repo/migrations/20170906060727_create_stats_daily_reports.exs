defmodule AcsStats.Repo.Migrations.CreateStatsDailyReports do
  use Ecto.Migration

  def change do
    create table(:stats_daily_reports) do
      add :app_id, :string, size: 40
      add :date, :date
      add :platform, :string, size: 20

      add :dau, :integer, default: 0
      add :danu, :integer, default: 0
      add :dapu, :integer, default: 0
      add :danpu, :integer, default: 0
      add :dad, :integer, default: 0
      add :dand, :integer, default: 0

      add :total_fee, :integer, default: 0

      timestamps()
    end

    create index(:stats_daily_reports, [:app_id, :date, :platform], unique: true)
  end
end

