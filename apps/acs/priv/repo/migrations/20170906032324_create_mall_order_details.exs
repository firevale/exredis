defmodule Acs.Repo.Migrations.CreateMallOrderDetails do
  use Ecto.Migration

  def change do
    create table(:mall_order_details) do

      timestamps()
    end

  end
end
