defmodule Acs.Repo.Migrations.CreateAdminUsers do
  use Ecto.Migration

  def change do
    create table(:admin_users) do

      timestamps()
    end

  end
end
