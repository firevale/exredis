defmodule Acs.Repo.Migrations.CreateAppDeviceDailyActivity do
  use Ecto.Migration

  def change do
    create table(:app_device_daily_activities) do
      add :date, :date
      add :active_seconds, :integer
      add :pay_amount, :integer
      add :app_device_id, references(:app_devices, on_delete: :nothing)

      timestamps()
    end
    create index(:app_device_daily_activities, [:app_device_id])

  end
end
