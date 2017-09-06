defmodule Acs.Repo.Migrations.CreateForumsSections do
  use Ecto.Migration

  def change do
    create table(:forums_sections) do
      add :title, :string
      add :sort, :integer  # 版块排序号
      add :active, :boolean, default: true

      add :forum_id, references(:forums, on_delete: :delete_all)

      timestamps()
    end

    create index(:forums_sections, [:forum_id])

  end
end
