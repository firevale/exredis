defmodule Acs.Repo.Migrations.CreatePmallTaskBars do
  use Ecto.Migration

  def change do
    create table(:pmall_task_bars) do

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

    create index(:pmall_task_bars, [:app_id])

  end
end
