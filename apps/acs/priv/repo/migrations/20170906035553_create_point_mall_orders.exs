defmodule Acs.Repo.Migrations.CreatePointMallOrders do
  use Ecto.Migration

  def change do
    create table(:point_mall_orders) do

      timestamps()
    end

  end
end
