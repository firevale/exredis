defmodule Acs.Repo.Migrations.CreateAppOrder do
  use Ecto.Migration

  def change do
    create table(:app_orders, primary_key: false) do
      add :id, :string, size: 100, primary_key: true
      add :platform, :string, size: 10
      add :device_id, :string, size: 100
      add :sdk, :string, size: 20
      add :sdk_user_id, :string, size: 50
      add :cp_order_id, :string, size: 150
      add :zone_id, :string, size: 20
      add :market, :string, size: 20
      add :status, :integer
      add :paid_at, :utc_datetime
      add :deliver_at, :utc_datetime
      add :try_deliver_at, :utc_datetime
      add :try_deliver_counter, :integer, default: 0
      add :price, :integer, default: 0
      add :currency, :string, size: 10
      add :goods_name, :string, size: 50
      add :debug_mode, :boolean
      add :paid_channel, :string, size: 20
      add :fee, :integer
      add :transaction_currency, :string, size: 20
      add :transaction_id, :string, size: 120
      add :transaction_status, :string, size: 20
      add :cp_result, :text
      add :app_user_id, :integer

      add :app_id, references(:apps, type: :string, on_delete: :nothing), size: 40
      add :user_id, references(:users, type: :integer, on_delete: :nothing)
      add :goods_id, references(:app_goods, type: :string, on_delete: :nothing), size: 100

      timestamps()
    end

    create index(:app_orders, [:app_id])
    create index(:app_orders, [:user_id])
    create index(:app_orders, [:app_user_id])
    create index(:app_orders, [:goods_id])
    create index(:app_orders, [:cp_order_id])
    create index(:app_orders, [:device_id])
    create index(:app_orders, [:status])
    create index(:app_orders, [:transaction_currency])
    create index(:app_orders, [:transaction_id], unique: true)
    create index(:app_orders, [:app_id, :cp_order_id], unique: true)
    create index(:app_orders, [:try_deliver_at, :try_deliver_counter])
    create index(:app_orders, [:deliver_at])
  end
end
