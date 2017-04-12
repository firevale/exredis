defmodule Acs.Repo.Migrations.CreateMallOrderDetail do
  use Ecto.Migration

  def change do
    create table(:mall_order_details) do
      add :good_name, :string
      add :good_pic, :string
      add :price, :integer
      add :amount, :integer
      add :good_id, references(:mall_goods,type: :string, on_delete: :nothing)
      add :order_id, references(:mall_orders, type: :string,on_delete: :nothing)

      timestamps()
    end
    create index(:mall_order_details, [:good_id])
    create index(:mall_order_details, [:order_id])

  end
end
