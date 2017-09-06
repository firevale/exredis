defmodule Acs.Repo.Migrations.CreateForumsPosts do
  use Ecto.Migration

  def change do
    create table(:forums_posts) do

      timestamps()
    end

  end
end
