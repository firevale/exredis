defmodule Acs.Repo.Migrations.CreateAppWcpUesers do
  use Ecto.Migration

  def change do
    create table(:app_wcp_uesers) do

      timestamps()
    end

  end
end
