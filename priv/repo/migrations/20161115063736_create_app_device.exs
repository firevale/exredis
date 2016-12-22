defmodule Acs.Repo.Migrations.CreateAppDevice do
  use Ecto.Migration

  def change do
    create table(:app_devices) do
      add :active_seconds, :integer, default: 0
      add :pay_amount, :integer, default: 0
      add :last_pay_at, :naive_datetime
      add :create_date, :date

      add :app_id, references(:apps, type: :string, on_delete: :delete_all)
      add :device_id, references(:devices, type: :string, on_delete: :nothing)
      add :zone_id, :string

      timestamps()
    end

    create index(:app_devices, [:app_id])
    create index(:app_devices, [:device_id])
    create index(:app_devices, [:zone_id])
    create index(:app_devices, [:app_id, :zone_id, :create_date])
    create index(:app_devices, [:app_id, :create_date])
    create index(:app_devices, [:app_id, :device_id])
    create index(:app_devices, [:app_id, :device_id, :zone_id])
  end
end
