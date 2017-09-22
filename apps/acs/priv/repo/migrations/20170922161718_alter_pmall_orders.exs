defmodule Acs.Repo.Migrations.AlterPointMallOrders do
  use Ecto.Migration

  def change do
    alter table(:pmall_orders) do

      add :details_id, references(:pmall_order_details, on_delete: :nothing)

    end

  end
end
