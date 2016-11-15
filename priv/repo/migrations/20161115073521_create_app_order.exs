defmodule Acs.Repo.Migrations.CreateAppOrder do
  use Ecto.Migration

  def change do
    create table(:app_orders, primary_key: false) do
      add :id, :string, primary_key: true
      add :platform, :string, size: 10
      add :sdk, :string, size: 20
      add :cp_order_id, :string
      add :status, :integer
      add :paid_at, :naive_datetime
      add :deliver_at, :naive_datetime
      add :paid_channel, :string
      add :fee, :integer
      add :currency, :string
      add :transaction_id, :string
      add :transaction_status, :string, size: 20

      add :app_user_id, references(:app_users, on_delete: :nothing)
      add :goods_id, references(:app_goods, type: :string, on_delete: :nothing)

      timestamps()
    end

    create index(:app_orders, [:app_user_id])
    create index(:app_orders, [:goods_id])
    create index(:app_orders, [:cp_order_id])
    create index(:app_orders, [:status])
    create index(:app_orders, [:transaction_id])
  end
end
