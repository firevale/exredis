defmodule Acs.Repo.Migrations.CreatePmallLuckyDrawLogs do
  use Ecto.Migration

  def change do
    create table(:pmall_lucky_draw_logs) do

      add :name, :string, size: 200
      add :pic, :string, size: 200
      add :status, :integer, default: 0

      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40
      add :wcp_user_id, references(:app_wcp_users, on_delete: :nothing)
      add :lucky_draw_id, references(:pmall_lucky_draws, on_delete: :nothing)

      timestamps()
    end

    create index(:pmall_lucky_draw_logs, [:app_id])
    create index(:pmall_lucky_draw_logs, [:app_id, :wcp_user_id])
    create unique_index(:pmall_lucky_draw_logs, [:app_id, :wcp_user_id, :lucky_draw_id])

  end
end
