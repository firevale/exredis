defmodule Acs.Repo.Migrations.CreateAppUserDailyActivity do
  use Ecto.Migration

  def change do
    create table(:app_user_daily_activities) do
      add :date, :date
      
      add :active_seconds, :integer, default: 0
      add :pay_amount, :integer, default: 0

      add :app_user_id, references(:app_users, on_delete: :delete_all)

      timestamps()
    end

    create index(:app_user_daily_activities, [:date])
    create index(:app_user_daily_activities, [:app_user_id])
    create index(:app_user_daily_activities, [:date, :app_user_id])
  end
end
