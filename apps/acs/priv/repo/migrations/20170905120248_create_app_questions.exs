defmodule Acs.Repo.Migrations.CreateAppQuestions do
  use Ecto.Migration

  def change do
    create table(:app_questions) do
      add :title, :string
      add :answer, :string
      add :is_hot, :boolean, default: false
      add :active, :boolean, default: true
      add :sort_index, :integer, default: 0
      add :reply_at, :utc_datetime 
      add :platform, :string

      add :app_id, references(:apps, type: :string, on_delete: :nothing), size: 40
      add :user_id, references(:users, on_delete: :nothing)
      timestamps()
    end

    create index(:app_questions, [:user_id])
    create index(:app_questions, [:app_id,:active, :is_hot, :sort_index])
    create index(:app_questions, [:app_id,:active, :user_id])
  end
end
