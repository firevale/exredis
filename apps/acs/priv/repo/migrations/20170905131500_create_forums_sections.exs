defmodule Acs.Repo.Migrations.CreateForumsSections do
  use Ecto.Migration

  def change do
    create table(:forums_sections) do

      timestamps()
    end

  end
end
