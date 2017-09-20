defmodule Acs.Repo.Migrations.CreatePmallDayQuestions do
  use Ecto.Migration

  def change do
    create table(:pmall_day_questions) do

      add :question, :string
      add :correct, :string, size: 200
      add :a1, :string, size: 200
      add :a2, :string, size: 200
      add :a3, :string, size: 200
      add :a4, :string, size: 200
      add :a5, :string, size: 200
      add :a6, :string, size: 200
      add :reads, :integer, default: 0
      add :bingo, :integer, default: 0

      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40

      timestamps()
    end

    create index(:pmall_day_questions, [:app_id])

  end
end
