defmodule Acs.Repo.Migrations.CreateAppLoginCodes do
  use Ecto.Migration

  def change do
    create table(:app_login_codes) do

      timestamps()
    end

  end
end
