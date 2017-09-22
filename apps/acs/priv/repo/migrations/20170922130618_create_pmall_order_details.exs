defmodule Acs.Repo.Migrations.CreatePMallOrderDetails do
  use Ecto.Migration

  def change do
    create table(:pmall_order_details) do
      add :goods_name, :string
      add :goods_pic, :string
      add :price, :integer
      add :amount, :integer
      add :pmall_goods_id, references(:pmall_goods, type: :string, on_delete: :nothing), size: 100
      add :pmall_order_id, references(:pmall_orders, type: :string,on_delete: :nothing), size: 100

      timestamps()
    end
    
    create index(:pmall_order_details, [:pmall_goods_id])
    create index(:pmall_order_details, [:pmall_order_id])

  end
end
