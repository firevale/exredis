defmodule Acs.Repo.Migrations.AddPointLog do
  use Ecto.Migration

  def change do
    create table(:point_logs) do

      add :log_type, :string
      add :point, :integer, default: 0
      add :memo, :string   #备注

      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40
      add :user_id, references(:users, type: :integer, on_delete: :delete_all)

      timestamps()
    end
    create index(:point_logs, [:app_id])
    create index(:point_logs, [:log_type])
    create index(:point_logs, [:user_id])

  end
end