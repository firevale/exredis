defmodule Acs.Repo.Migrations.CreateAppGoodsProductIds do
  use Ecto.Migration

  def change do
    create table(:app_goods_product_ids) do

      timestamps()
    end

  end
end
