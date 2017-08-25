defmodule Acs.Repo.Migrations.AlterAdminUser do
  use Ecto.Migration

  def change do
    alter table(:admin_users) do 
      add :active, :boolean, default: true
      add :admin_level, :integer, default: 0
      add :app_id, references(:apps, type: :string, on_delete: :nothing), size: 100
      add :user_id, references(:users, type: :integer, on_delete: :delete_all)
    end
    
    drop index(:admin_users, [:account_id])
    create index(:admin_users, [:app_id, :user_id], unique: true)
  end
end
