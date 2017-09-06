defmodule Acs.Repo.Migrations.CreateForumsUserFavoritePosts do
  use Ecto.Migration

  def change do
    create table(:forums_user_favorite_posts) do

      timestamps()
    end

  end
end
