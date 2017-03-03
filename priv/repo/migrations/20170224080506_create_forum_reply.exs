defmodule Acs.Repo.Migrations.CreateForumReply do
  use Ecto.Migration

  def change do
    create table(:forums_replys) do
      add :content, :text
      add :created_at, :naive_datetime

      add :post_id, references(:forums_posts, on_delete: :delete_all)
      add :user_id, references(:users, type: :integer, on_delete: :nothing)

      timestamps()
    end

  end
end
