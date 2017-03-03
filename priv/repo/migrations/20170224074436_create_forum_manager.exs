defmodule Acs.Repo.Migrations.CreateForumManager do
  use Ecto.Migration

  def change do
    create table(:forums_managers) do
      add :logins, :integer, default: 0  #登录次数
      add :created_at, :naive_datetime

      add :forum_id, references(:forums, on_delete: :nothing)
      add :user_id, references(:users, type: :integer, on_delete: :nothing)

      timestamps()
    end

  end
end
