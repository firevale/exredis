defmodule Acs.Repo.Migrations.CreateAppSdkPaymentCallback do
  use Ecto.Migration

  def change do
    create table(:app_sdk_payment_callbacks) do
      add :platform, :string, size: 20
      add :sdk, :string, size: 50
      add :payment_callback, :string
      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40

      timestamps()
    end

    create index(:app_sdk_payment_callbacks, [:app_id])
    create index(:app_sdk_payment_callbacks, [:platform, :sdk, :app_id], unique: true)
  end
end
