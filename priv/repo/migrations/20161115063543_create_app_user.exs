defmodule Acs.Repo.Migrations.CreateAppUser do
  use Ecto.Migration

  def change do
    create table(:app_users) do
      add :app_user_id, :string 
      add :app_zone_id, :string

      add :active_minutes, :integer, default: 0
      add :pay_amount, :integer, default: 0
      add :last_pay_at, :naive_datetime

      add :app_id, references(:apps, type: :string, on_delete: :delete_all)
      add :user_id, references(:users, type: :integer, on_delete: :nothing)

      timestamps()
    end

    create index(:app_users, [:app_id])
    create index(:app_users, [:user_id])

  end
end
