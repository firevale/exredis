defmodule Acs.Repo.Migrations.CreateAppWcpMessages do
  use Ecto.Migration

  def change do
    create table(:app_wcp_messages) do

      add :from, :string
      add :to, :string
      add :msg_type, :string
      add :content, :binary
      add :create_time, :integer
  
      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40

      timestamps()
    end

    create index(:app_wcp_messages, [:app_id, :from])
    create index(:app_wcp_messages, [:app_id, :to])

  end
end
