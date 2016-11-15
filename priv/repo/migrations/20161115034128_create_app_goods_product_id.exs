defmodule Acs.Repo.Migrations.CreateAppGoodsProductId do
  use Ecto.Migration

  def change do
    create table(:app_goods_product_ids) do
      add :sdk, :string
      add :product_id, :string
      add :app_goods_id, references(:app_goods, type: :string, on_delete: :delete_all)

      timestamps()
    end
    create index(:app_goods_product_ids, [:app_goods_id])

  end
end
