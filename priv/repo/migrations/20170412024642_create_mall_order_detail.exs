defmodule Acs.Repo.Migrations.CreateMallOrderDetail do
  use Ecto.Migration

  def change do
    create table(:mall_order_details) do
      add :goods_name, :string
      add :goods_pic, :string
      add :price, :integer
      add :amount, :integer
      add :mall_goods_id, references(:mall_goods, type: :string, on_delete: :nothing), size: 100
      add :mall_order_id, references(:mall_orders, type: :string,on_delete: :nothing), size: 100

      timestamps()
    end
    create index(:mall_order_details, [:mall_goods_id])
    create index(:mall_order_details, [:mall_order_id])

  end
end
