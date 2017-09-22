defmodule Acs.Repo.Migrations.CreateMallOrderLogs do
  use Ecto.Migration

  def change do
    create table(:mall_order_logs) do

      add :content, :map
      add :status, :integer
      add :changed_status, :integer
      add :admin_user, :string

      add :mall_order_id, references(:mall_orders, type: :string, on_delete: :delete_all), size: 100

      timestamps()
    end

    create index(:mall_order_logs, [:mall_order_id])

  end
end
