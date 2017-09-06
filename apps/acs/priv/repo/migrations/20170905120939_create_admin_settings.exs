defmodule Acs.Repo.Migrations.CreateAdminSettings do
  use Ecto.Migration

  def change do
    create table(:admin_settings) do

      timestamps()
    end

  end
end
