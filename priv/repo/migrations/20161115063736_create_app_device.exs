defmodule Acs.Repo.Migrations.CreateAppDevice do
  use Ecto.Migration

  def change do
    create table(:app_devices) do
      add :sdk, :string

      add :active_seconds, :integer, default: 0
      add :pay_amount, :integer, default: 0
      add :last_pay_at, :naive_datetime

      add :app_id, references(:apps, type: :string, on_delete: :delete_all)
      add :device_id, references(:devices, type: :string, on_delete: :nothing)

      timestamps()
    end

    create index(:app_devices, [:app_id])
    create index(:app_devices, [:device_id])
  end
end
