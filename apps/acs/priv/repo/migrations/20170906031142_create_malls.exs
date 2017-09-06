defmodule Acs.Repo.Migrations.CreateMalls do
  use Ecto.Migration

  def change do
    create table(:malls) do

      timestamps()
    end

  end
end
