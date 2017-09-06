defmodule Acs.Repo.Migrations.CreatePmallGoods do
  use Ecto.Migration

  def change do
    create table(:pmall_goods) do

      timestamps()
    end

  end
end
