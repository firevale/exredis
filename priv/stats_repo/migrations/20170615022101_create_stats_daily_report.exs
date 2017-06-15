defmodule Acs.Repo.Migrations.CreateAcs.Stats.DailyReport do
  use Ecto.Migration

  def change do
    create table(:stats_daily_reports) do
      add :date, :date
      add :platform, :string

      timestamps()
    end

  end
end
