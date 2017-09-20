defmodule Acs.Repo.Migrations.CreatePmallLuckyDraws do
  use Ecto.Migration

  def change do
    create table(:pmall_lucky_draws) do

      add :name, :string, size: 200
      add :pic, :string, size: 200
      add :num, :integer, default: 0
      add :rate, :integer, default: 0

      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40

      timestamps()
    end

    create index(:pmall_lucky_draws, [:app_id])

  end
end
