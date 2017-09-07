defmodule Acs.Repo.Migrations.CreateForumsUserFavoritePosts do
  use Ecto.Migration

  def change do
    create table(:forums_user_favorite_posts) do

      add :post_id, references(:forums_posts, on_delete: :delete_all)
      add :user_id, references(:users, type: :integer, on_delete: :delete_all)

      timestamps()
    end

    create index(:forums_user_favorite_posts, [:post_id])
    create index(:forums_user_favorite_posts, [:user_id])
    create unique_index(:forums_user_favorite_posts, [:user_id, :post_id])

  end
end
