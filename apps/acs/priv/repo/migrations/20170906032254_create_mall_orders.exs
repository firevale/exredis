defmodule Acs.Repo.Migrations.CreateMallOrders do
  use Ecto.Migration

  def change do
    create table(:mall_orders) do

      timestamps()
    end

  end
end
