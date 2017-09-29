defmodule Acs.Repo.Migrations.CreatePMallUserPoints do
  use Ecto.Migration

  def change do
    create table(:pmall_user_points) do
      add :point, :integer

      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40
      add :wcs_user_id, references(:wcs_users, on_delete: :delete_all)

      timestamps()
    end

    create unique_index(:pmall_user_points, [:app_id, :wcs_user_id])
    create index(:pmall_user_points, [:app_id])
  end
end
