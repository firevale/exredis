defmodule Acs.Repo.Migrations.CreateUserSdkBindings do
  use Ecto.Migration

  def change do
    create table(:user_sdk_bindings) do

      timestamps()
    end

  end
end
