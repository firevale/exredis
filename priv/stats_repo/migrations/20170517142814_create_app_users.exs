defmodule Acs.StatsRepo.Migrations.CreateAppUsers do
  use Ecto.Migration

  def change do
    create table(:app_users) do
      add :app_id, :string
      add :zone_id, :string, default: "0"
      add :user_id, :integer

      add :app_user_id, :string
      add :app_user_name, :string
      add :app_user_level, :integer, default: 1

      add :active_seconds, :integer, default: 0
      add :pay_amount, :integer, default: 0

      add :reg_date, :date
      add :last_active_at, :utc_datetime
      add :last_paid_at, :utc_datetime

      timestamps()
    end

    create index(:app_users, [:app_id])
    create index(:app_users, [:user_id])
    create index(:app_users, [:zone_id])
    create index(:app_users, [:app_user_id])
    create index(:app_users, [:inserted_at])
    create index(:app_users, [:reg_date])
    create index(:app_users, [:last_active_at])
    create index(:app_users, [:last_paid_at])
    create index(:app_users, [:app_id, :reg_date])
    create index(:app_users, [:app_id, :zone_id, :reg_date])
    create index(:app_users, [:app_id, :user_id])
    create index(:app_users, [:app_id, :user_id, :zone_id], unique: true)
  end
end
