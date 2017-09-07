defmodule Acs.Repo.Migrations.CreateAppWcpMessageRules do
  use Ecto.Migration

  def change do
    create table(:app_wcp_message_rules) do
      add :keywords, :string
      add :response, :binary
  
      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40

      timestamps()
    end

    create unique_index(:app_wcp_message_rules, [:app_id, :keywords])

  end
end
