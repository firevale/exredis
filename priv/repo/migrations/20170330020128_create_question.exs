defmodule Acs.Repo.Migrations.CreateQuestion do
  use Ecto.Migration

  def change do
    create table(:questions) do
      add :title, :string
      add :answer, :string
      add :is_hot, :boolean, default: false
      add :active, :boolean, default: true
      add :sort_index, :integer, default: 0
      add :reply_at, :utc_datetime 
      add :platform, :string

      add :app_id, references(:apps, type: :string, on_delete: :nothing)
      add :user_id, references(:users, type: :integer, on_delete: :nothing)
      timestamps()
    end

    create index(:questions, [:app_id,:active, :is_hot, :sort_index])
    create index(:questions, [:app_id,:active, :user_id])
  end
end
