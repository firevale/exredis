defmodule Acs.Repo.Migrations.CreateForumComment do
  use Ecto.Migration

  def change do
    create table(:forums_comments) do
      add :content, :binary
      add :active, :boolean, default: true
      add :floor, :integer

      add :post_id, references(:forums_posts, on_delete: :delete_all)
      add :user_id, references(:users, type: :integer, on_delete: :nothing)
      add :editer_id, references(:users, type: :integer, on_delete: :nothing)

      timestamps()
    end

    create index(:forums_comments, [:post_id])
    create index(:forums_comments, [:user_id])
    create index(:forums_comments, [:post_id, :floor], unique: true)

  end
end
