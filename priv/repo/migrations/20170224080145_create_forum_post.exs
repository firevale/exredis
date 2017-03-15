defmodule Acs.Repo.Migrations.CreateForumPost do
  use Ecto.Migration

  def change do
    create table(:forums_posts) do
      add :title, :string
      add :content, :text
      add :is_top, :boolean, default: false, null: false
      add :is_hot, :boolean, default: false, null: false
      add :is_vote, :boolean, default: false, null: false
      add :reads, :integer, default: 0
      add :comms, :integer, default: 0   #回复数
      add :last_reply_at, :naive_datetime
      add :active, :boolean, default: true
      add :has_pic, :boolean, default: false

      add :forum_id, references(:forums, on_delete: :delete_all)
      add :section_id, references(:forums_sections, on_delete: :delete_all)
      add :user_id, references(:users, type: :integer, on_delete: :nothing)
      add :editer_id, references(:users, type: :integer, on_delete: :nothing)

      timestamps()
    end

    create index(:forums_posts, [:user_id])
    create index(:forums_posts, [:forum_id, :section_id])

  end
end
