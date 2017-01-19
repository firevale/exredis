defmodule Acs.Repo.Migrations.CreateDevice do
  use Ecto.Migration

  def change do
    create table(:devices, primary_key: false) do
      add :id, :string, primary_key: true
      add :model, :string
      add :platform, :string
      add :os, :string
      add :created_at, :naive_datetime

      timestamps()
    end

    create index(:devices, [:model])
    create index(:devices, [:platform])
    create index(:devices, [:os])
    create index(:devices, [:created_at])
  end
end
