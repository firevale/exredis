defmodule Acs.Repo.Migrations.AddOperateLog do
  use Ecto.Migration

  def change do
    create table(:operate_logs) do
      add :operate_type, :string
      add :log, :map

      add :app_id, references(:apps, type: :string, on_delete: :delete_all)
      add :user_id, references(:users, type: :integer, on_delete: :delete_all)

      timestamps()
    end
    create index(:operate_logs, [:app_id])
    create index(:operate_logs, [:operate_type])
    create index(:operate_logs, [:user_id])

  end
end