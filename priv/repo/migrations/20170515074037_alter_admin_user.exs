defmodule Acs.Repo.Migrations.AlterAdminUser do
  use Ecto.Migration

  def change do
    alter table(:admin_users) do 
      add :active, :boolean, default: true
      add :admin_level, :integer, default: 0
      add :app_id, references(:apps, type: :string, on_delete: :nothing)
    end
    
    drop index(:admin_users, [:account_id])
    create index(:admin_users, [:app_id, :account_id], unique: true)
  end
end
