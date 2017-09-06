defmodule Acs.Repo.Migrations.CreateForumsManagers do
  use Ecto.Migration

  def change do
    create table(:forums_managers) do

      timestamps()
    end

  end
end
