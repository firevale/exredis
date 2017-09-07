defmodule Acs.Repo.Migrations.CreateAdminOpLogs do
  use Ecto.Migration

  def change do
    create table(:admin_op_logs) do
      add :operate_type, :string
      add :log, :map

      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40
      add :user_id, references(:users, type: :integer, on_delete: :delete_all)

      timestamps()
    end

    create index(:admin_op_logs, [:app_id])
    create index(:admin_op_logs, [:operate_type])
    create index(:admin_op_logs, [:user_id])

  end
end
