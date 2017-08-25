defmodule Acs.Repo.Migrations.CreateAdminUsers do
  use Ecto.Migration

  def change do
    create table(:admin_users) do
      add :account_id, :string, size: 50

      timestamps()
    end

    create index(:admin_users, [:account_id], unique: true)

  end
end
