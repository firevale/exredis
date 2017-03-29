defmodule Acs.Repo.Migrations.CreateForumNews do
  use Ecto.Migration

  def change do
    create table(:forums_news) do
      add :title, :string
      add :content, :binary
      add :group, :string
      add :is_top, :boolean, default: false, null: false
      add :pic, :string
      add :reads, :integer, default: 0

      add :forum_id, references(:forums, on_delete: :delete_all)
      add :user_id, references(:users, type: :integer, on_delete: :nothing)

      timestamps()
    end

    create index(:forums_news, [:forum_id, :group])

  end
end
