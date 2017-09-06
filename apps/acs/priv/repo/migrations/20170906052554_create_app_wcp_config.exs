defmodule Acs.Repo.Migrations.CreateAppWcpConfig do
  use Ecto.Migration

  def change do
    create table(:app_wcp_config) do

      timestamps()
    end

  end
end
