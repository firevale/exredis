defmodule Acs.Repo.Migrations.CreateAppSdkBinding do
  use Ecto.Migration

  def change do
    create table(:app_sdk_bindings) do
      add :sdk, :string
      add :binding, :map
      add :app_id, references(:apps, type: :string, on_delete: :delete_all)

      timestamps()
    end

    create index(:app_sdk_bindings, [:sdk, :app_id], unique: true)
    create index(:app_sdk_bindings, [:app_id])
  end
end
