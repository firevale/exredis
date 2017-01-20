defmodule Acs.Repo.Migrations.CreateAppDevice do
  use Ecto.Migration

  def change do
    create table(:app_devices) do
      add :active_seconds, :integer, default: 0
      add :pay_amount, :integer, default: 0
      add :last_paid_at, :naive_datetime
      add :last_active_at, :naive_datetime
      add :created_at, :naive_datetime
      add :reg_date, :date # add this field for daily report calculation
      add :zone_id, :string, default: "0"

      add :app_id, references(:apps, type: :string, on_delete: :delete_all)
      add :device_id, references(:devices, type: :string, on_delete: :delete_all)

      timestamps()
    end

    create index(:app_devices, [:app_id])
    create index(:app_devices, [:device_id])
    create index(:app_devices, [:zone_id])
    create index(:app_devices, [:last_active_at])
    create index(:app_devices, [:last_paid_at])
    create index(:app_devices, [:app_id, :zone_id, :reg_date])
    create index(:app_devices, [:app_id, :reg_date])
    create index(:app_devices, [:app_id, :device_id])
    create index(:app_devices, [:app_id, :device_id, :zone_id], unique: true)
  end
end
