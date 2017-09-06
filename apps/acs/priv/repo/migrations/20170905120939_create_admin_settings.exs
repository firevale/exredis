defmodule Acs.Repo.Migrations.CreateAdminSettings do
  use Ecto.Migration

  def change do
    create table(:admin_settings) do
      add :name, :string, size: 100
      add :value, :binary
      add :group, :string, size: 100
      add :memo,  :string
      add :active, :boolean, default: true

      timestamps()
    end

    create unique_index(:admin_settings, [:name])

  end
end
