defmodule Acs.Repo.Migrations.CreateItcApps do
  use Ecto.Migration

  def change do
    create table(:itc_apps) do
      add :itc_app_id, :string, size: 100
      add :itc_login, :string, size: 50
      add :itc_password, :string, size: 50
      add :num_testers, :integer
      add :active, :boolean, default: false

      add :app_id, references(:apps, type: :string, on_delete: :nothing), size: 40

      timestamps()
    end

    create index(:itc_apps, [:itc_app_id], unique: true)
    create index(:itc_apps, [:app_id])
  end
end
