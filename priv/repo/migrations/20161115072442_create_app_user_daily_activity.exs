defmodule Acs.Repo.Migrations.CreateAppUserDailyActivity do
  use Ecto.Migration

  def change do
    create table(:app_user_daily_activities) do
      add :date, :date
      add :active_minutes, :integer
      add :pay_amount, :integer
      add :app_user_id, references(:app_users, on_delete: :nothing)

      timestamps()
    end
    create index(:app_user_daily_activities, [:app_user_id])

  end
end
