defmodule Acs.Repo.Migrations.CreateForumsManagers do
  use Ecto.Migration

  def change do
    create table(:forums_managers) do
      add :logins, :integer, default: 0  #登录次数

      add :forum_id, references(:forums, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:forums_managers, [:forum_id])
    create index(:forums_managers, [:user_id])

  end
end