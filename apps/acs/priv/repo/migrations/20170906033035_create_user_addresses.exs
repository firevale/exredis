defmodule Acs.Repo.Migrations.CreateUserAddresses do
  use Ecto.Migration

  def change do
    create table(:user_addresses) do
      add :name, :string
      add :mobile, :string
      add :area, :string
      add :address, :string
      add :area_code, :string
      add :is_default, :boolean, default: false

      add :user_id, references(:users, type: :integer, on_delete: :nothing)

      timestamps()
    end

    create index(:user_addresses, [:user_id])

  end
end
