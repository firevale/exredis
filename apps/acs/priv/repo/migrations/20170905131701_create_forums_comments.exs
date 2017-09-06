defmodule Acs.Repo.Migrations.CreateForumsComments do
  use Ecto.Migration

  def change do
    create table(:forums_comments) do

      timestamps()
    end

  end
end
