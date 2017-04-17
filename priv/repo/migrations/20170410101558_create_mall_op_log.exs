defmodule Acs.Repo.Migrations.CreateMallOPLog do
  use Ecto.Migration

  def change do
    create table(:mall_op_logs) do

      add :content, :string
      add :status, :integer
      add :changed_status, :integer
      add :admin_user, :string
      add :mall_order_id, references(:mall_orders, type: :string, on_delete: :delete_all)
      timestamps()
    end

    create index(:mall_op_logs, [:mall_order_id])

  end
end
