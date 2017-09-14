defmodule Acs.Repo.Migrations.CreateTaskBar do
  use Ecto.Migration

  def change do
    create table(:task_bars) do

      add :pic, :string
      add :name, :string
      add :sub_name, :string
      add :point, :integer, default: 0
      add :path, :string   #路径
      add :active, :boolean, default: false
      add :sort, :integer, default: 0

      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40

      timestamps()
    end

    create index(:task_bars, [:app_id])

  end
end
