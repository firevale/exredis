defmodule Acs.Repo.Migrations.CreateMallGoods do
  use Ecto.Migration

  def change do
    create table(:mall_goods) do

      timestamps()
    end

  end
end
