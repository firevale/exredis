defmodule Acs.Repo.Migrations.CreateAppOrders do
  use Ecto.Migration

  def change do
    create table(:app_orders) do

      timestamps()
    end

  end
end
