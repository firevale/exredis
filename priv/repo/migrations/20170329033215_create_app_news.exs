defmodule Acs.Repo.Migrations.CreateAppNews do
  use Ecto.Migration

  def change do
    create table(:app_news) do
      add :title, :string
      add :content, :binary
      add :group, :string
      add :is_top, :boolean, default: false, null: false
      add :pic, :string
      add :reads, :integer, default: 0
      add :active, :boolean, default: false

      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40
      add :user_id, references(:users, type: :integer, on_delete: :nothing)

      timestamps()
    end

    create index(:app_news, [:app_id, :group])

  end
end
