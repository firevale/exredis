defmodule Acs.Repo.Migrations.CreateAppNews do
  use Ecto.Migration

  def change do
    create table(:app_news) do

      timestamps()
    end

  end
end
