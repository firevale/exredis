defmodule Acs.Repo.Migrations.CreateUserAddresses do
  use Ecto.Migration

  def change do
    create table(:user_addresses) do

      timestamps()
    end

  end
end
