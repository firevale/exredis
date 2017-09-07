defmodule Acs.Repo.Migrations.CreateAdminUsers do
  use Ecto.Migration

  def change do
    create table(:admin_users) do
      add :account_id, :string, size: 50
      add :active, :boolean, default: true
      add :admin_level, :integer, default: 0

      add :app_id, references(:apps, type: :string, on_delete: :nothing), size: 100
      add :user_id, references(:users, type: :integer, on_delete: :delete_all)

      timestamps()
    end

    create unique_index(:admin_users, [:app_id, :user_id])
    create index(:admin_users, [:user_id])

  end
end
