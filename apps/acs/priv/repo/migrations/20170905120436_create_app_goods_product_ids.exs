defmodule Acs.Repo.Migrations.CreateAppGoodsProductIds do
  use Ecto.Migration

  def change do
    create table(:app_goods_product_ids) do
      add :sdk, :string, size: 50
      add :product_id, :string, size: 100
      add :app_goods_id, references(:app_goods, type: :string, on_delete: :delete_all), size: 100

      timestamps()
    end

    create index(:app_goods_product_ids, [:app_goods_id])
    create unique_index(:app_goods_product_ids, [:app_goods_id, :sdk])

  end
end
