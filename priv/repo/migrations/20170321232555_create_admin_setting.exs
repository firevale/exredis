defmodule Acs.Repo.Migrations.CreateAdminSetting do
  use Ecto.Migration

  def change do
    create table(:settings) do
      add :name, :string
      add :value, :binary
      add :group, :string
      add :memo,  :string
      add :active, :boolean, default: true

      timestamps()
    end

    create index(:settings, [:name], unique: true)

  end
end
