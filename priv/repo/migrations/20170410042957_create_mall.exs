defmodule Acs.Repo.Migrations.CreateMall do
  use Ecto.Migration

  def change do
    create table(:malls) do
      add :title, :string
      add :active, :boolean, default: false
      add :icon, :string

      add :app_id, references(:apps, type: :string, on_delete: :nothing), size: 40

      timestamps()
    end

    create index(:malls, [:app_id], unique: true)

  end
end
