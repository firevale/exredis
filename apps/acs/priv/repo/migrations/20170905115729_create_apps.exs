defmodule Acs.Repo.Migrations.CreateApps do
  use Ecto.Migration

  def change do
    create table(:apps) do

      timestamps()
    end

  end
end
