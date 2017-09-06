defmodule Acs.Repo.Migrations.CreateAppGoods do
  use Ecto.Migration

  def change do
    create table(:app_goods) do

      timestamps()
    end

  end
end
