defmodule Acs.Repo.Migrations.CreatePMallCdkeys do
  use Ecto.Migration

  def change do
    create table(:pmall_cdkeys) do
      add :code, :string
      add :code_type, :string
      add :assigned_at, :utc_datetime
      add :used_at, :utc_datetime

      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40
      add :owner_id, references(:wcs_users, on_delete: :delete_all)

      timestamps()
    end

    create unique_index(:pmall_cdkeys, [:app_id, :code_type, :code])
    create index(:pmall_cdkeys, [:app_id])
    create index(:pmall_cdkeys, [:app_id, :code_type])

  end
end
