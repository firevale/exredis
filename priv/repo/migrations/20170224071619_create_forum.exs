defmodule Acs.Repo.Migrations.CreateForum do
  use Ecto.Migration

  def change do
    create table(:forums) do
      add :title, :string
      add :status, :integer, default: 0 #状态 0正常 1关闭
      add :created_at, :naive_datetime

      add :app_id, references(:apps, type: :string, on_delete: :nothing)

      timestamps()

   end

  end
end
