defmodule Acs.Repo.Migrations.CreateItcApps do
  use Ecto.Migration

  def change do
    create table(:itc_apps) do
      add :itc_app_id, :string
      add :itc_login, :string
      add :itc_password, :string
      add :num_testers, :integer
      add :active, :boolean, default: false

      add :app_id, references(:apps, type: :string, on_delete: :nothing)

      timestamps()
    end

    create index(:itc_apps, [:itc_app_id], unique: true)
    create index(:itc_apps, [:app_id])
  end
end
