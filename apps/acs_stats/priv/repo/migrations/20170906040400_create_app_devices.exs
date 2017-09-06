defmodule AcsStats.Repo.Migrations.CreateAppDevices do
  use Ecto.Migration

  def change do
    create table(:app_devices) do
      add :active_seconds, :integer, default: 0
      add :pay_amount, :integer, default: 0
      add :last_paid_at, :utc_datetime
      add :last_active_at, :utc_datetime
      add :reg_date, :date # add this field for daily report calculation
      add :zone_id, :string, size: 50, default: "0"
      add :app_id, :string, size: 40
      add :first_paid_at, :utc_datetime
      add :platform, :string
      
      add :device_id, references(:devices, type: :string, on_delete: :delete_all), size: 100

      timestamps()
    end

    create index(:app_devices, [:app_id])
    create index(:app_devices, [:device_id])
    create index(:app_devices, [:zone_id])
    create index(:app_devices, [:inserted_at])
    create index(:app_devices, [:last_active_at])
    create index(:app_devices, [:last_paid_at])
    create index(:app_devices, [:app_id, :zone_id, :reg_date])
    create index(:app_devices, [:app_id, :reg_date])
    create index(:app_devices, [:app_id, :device_id])
    create unique_index(:app_devices, [:app_id, :device_id, :zone_id])
    create index(:app_devices, [:platform])
    create index(:app_devices, [:first_paid_at])
  end
end

