defmodule AcsStats.Repo.Migrations.CreateDevices do
  use Ecto.Migration

  def change do
    create table(:devices, primary_key: false) do
      add :id, :string, size: 100, primary_key: true
      add :model, :string, size: 50
      add :platform, :string, size: 20
      add :os, :string, size: 20

      timestamps()
    end

    create index(:devices, [:model])
    create index(:devices, [:platform])
    create index(:devices, [:os])
    create index(:devices, [:inserted_at])
  end
end