defmodule Acs.Repo.Migrations.CreateForumPost do
  use Ecto.Migration

  def change do
    create table(:forums_posts) do
      add :title, :string
      add :content, :text
      add :is_top, :boolean, default: false, null: false
      add :is_hot, :boolean, default: false, null: false
      add :is_vote, :boolean, default: false, null: false
      add :last_reply_at, :datetime

      add :section_id, references(:forums_sections, on_delete: :delete_all)
      add :user_id, references(:users, type: :integer, on_delete: :nothing)

      timestamps()
    end

  end
end
