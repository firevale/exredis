defmodule Acs.Repo.Migrations.CreateMallGoods do
  use Ecto.Migration

  def change do
    create table(:mall_goods, primary_key: false) do
      add :id, :string, size: 100, primary_key: true
      add :name, :string
      add :description, :binary

      add :price, :integer
      add :currency, :string, default: "CNY"
      add :postage, :integer      #邮费
      add :pic, :string, size: 800
      add :stock, :integer, default: 0    #库存
      add :sold, :integer, default: 0     #售出数量
      add :reads, :integer, default: 0
      add :active, :boolean, default: false

      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40
      add :user_id, references(:users, type: :integer, on_delete: :nothing)

      timestamps()
    end

    create index(:mall_goods, [:app_id])

  end
end
