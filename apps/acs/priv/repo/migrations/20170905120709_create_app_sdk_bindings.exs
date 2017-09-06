defmodule Acs.Repo.Migrations.CreateAppSdkBindings do
  use Ecto.Migration

  def change do
    create table(:app_sdk_bindings) do

      timestamps()
    end

  end
end
