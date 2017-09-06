defmodule Acs.Repo.Migrations.CreateAppQuestions do
  use Ecto.Migration

  def change do
    create table(:app_questions) do

      timestamps()
    end

  end
end
