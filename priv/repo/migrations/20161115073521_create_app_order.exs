defmodule Acs.Repo.Migrations.CreateAppOrder do
  use Ecto.Migration

  def change do
    create table(:app_orders, primary_key: false) do
      add :id, :string, primary_key: true
      add :platform, :string, size: 10
      add :device_id, :string
      add :sdk, :string, size: 20
      add :cp_order_id, :string
      add :zone_id, :string
      add :market, :string
      add :status, :integer
      add :paid_at, :naive_datetime
      add :deliver_at, :naive_datetime
      add :try_deliver_at, :naive_datetime
      add :try_deliver_counter, :integer, default: 0
      add :price, :integer, default: 0
      add :currency, :string
      add :goods_name, :string
      add :debug_mode, :boolean
      add :paid_channel, :string
      add :fee, :integer
      add :transaction_currency, :string
      add :transaction_id, :string
      add :transaction_status, :string, size: 20

      add :app_id, references(:apps, type: :string, on_delete: :nothing)
      add :user_id, references(:users, type: :integer, on_delete: :nothing)
      add :app_user_id, references(:app_users, on_delete: :nothing)
      add :goods_id, references(:app_goods, type: :string, on_delete: :nothing)

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
    create index(:app_orders, [:transaction_id])
    create index(:app_orders, [:try_deliver_at, :try_deliver_counter])
  end
end
