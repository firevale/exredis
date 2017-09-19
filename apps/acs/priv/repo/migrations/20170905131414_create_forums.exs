defmodule Acs.Repo.Migrations.CreateForums do
  use Ecto.Migration

  def change do
    create table(:forums, primary_key: false) do
      add :id, :string, size: 20, primary_key: true  # use app's alias to index forums
      add :title, :string
      add :active, :boolean, default: true
      add :icon, :string

      add :app_id, references(:apps, type: :string, on_delete: :nothing), size: 40

      timestamps()

   end

   create unique_index(:forums, [:app_id])

  end
end
