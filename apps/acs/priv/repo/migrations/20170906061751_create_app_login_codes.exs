defmodule Acs.Repo.Migrations.CreateAppLoginCodes do
  use Ecto.Migration

  def change do
    create table(:app_login_codes) do
      add :code, :string, size: 20
      add :owner, :string, size: 100
  
      add :assigned_at, :utc_datetime
      add :used_at, :utc_datetime
  
      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

    create unique_index(:app_login_codes, [:app_id, :code])
    create unique_index(:app_login_codes, [:app_id, :user_id])
    create index(:app_login_codes, [:app_id, :owner])
    create index(:app_login_codes, [:user_id])
    create index(:app_login_codes, [:assigned_at])
    create index(:app_login_codes, [:used_at])
    create index(:app_login_codes, [:inserted_at])

  end
end
