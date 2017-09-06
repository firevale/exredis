defmodule Acs.Repo.Migrations.CreateAppWcpMessages do
  use Ecto.Migration

  def change do
    create table(:app_wcp_messages) do

      timestamps()
    end

  end
end
