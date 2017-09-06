defmodule Acs.Repo.Migrations.CreateAppWcpMessageRules do
  use Ecto.Migration

  def change do
    create table(:app_wcp_message_rules) do

      timestamps()
    end

  end
end
