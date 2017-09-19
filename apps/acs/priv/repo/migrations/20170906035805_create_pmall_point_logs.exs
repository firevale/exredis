defmodule Acs.Repo.Migrations.CreatePmallPointLogs do
  use Ecto.Migration

  def change do
    create table(:pmall_point_logs) do

      add :log_type, :string
      add :point, :integer, default: 0
      add :memo, :string   #备注

      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40
      add :wcp_user_id, references(:app_wcp_users, on_delete: :delete_all)

      timestamps()
    end
    create index(:pmall_point_logs, [:app_id])
    create index(:pmall_point_logs, [:log_type])
    create index(:pmall_point_logs, [:wcp_user_id])
    
  end
end
