defmodule Acs.Repo.Migrations.CreateAcs.Stats.DailyUserRetention do
  use Ecto.Migration

  def change do
    create table(:stats_daily_user_retentions) do
      add :nday, :integer
      add :retention, :integer

      add :report_id, references(:stats_daily_reports, on_delete: :delete_all)

      timestamps()
    end

    create index(:stats_daily_user_retentions, [:report_id])
    create index(:stats_daily_user_retentions, [:nday, :report_id], unique: true)

  end
end
