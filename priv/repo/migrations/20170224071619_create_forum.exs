defmodule Acs.Repo.Migrations.CreateForum do
  use Ecto.Migration

  def change do
    create table(:forums) do
      add :title, :string
      add :active, :boolean, default: true
      add :icon, :string

      add :app_id, references(:apps, type: :string, on_delete: :nothing), size: 40

      timestamps()

   end

   create index(:forums, [:app_id], unique: true)

  end
end
