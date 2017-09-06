defmodule Acs.Repo.Migrations.CreateForums do
  use Ecto.Migration

  def change do
    create table(:forums) do

      timestamps()
    end

  end
end
