defmodule Acs.Repo.Migrations.CreateUserFavoritePost do
  use Ecto.Migration

  def change do
    create table(:user_favorite_posts) do

      add :post_id, references(:forums_posts, on_delete: :delete_all)
      add :user_id, references(:users, type: :integer, on_delete: :delete_all)

      timestamps()
    end

    create index(:user_favorite_posts, [:post_id])
    create index(:user_favorite_posts, [:user_id])

  end
end
