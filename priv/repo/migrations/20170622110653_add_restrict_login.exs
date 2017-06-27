defmodule Acs.Repo.Migrations.AddRestrictLogin do
  use Ecto.Migration

  def change do
    alter table(:apps) do 
      add :restrict_login, :boolean, default: false
    end
    
    create table(:app_login_codes) do 
      add :code, :string
      add :owner, :string

      add :assigned_at, :utc_datetime
      add :used_at, :utc_datetime

      add :app_id, references(:apps, type: :string, on_delete: :delete_all)
      add :user_id, references(:users, type: :integer, on_delete: :delete_all)

      timestamps()
    end

    create index(:app_login_codes, [:app_id, :code], unique: true)
    create index(:app_login_codes, [:app_id, :user_id], unique: true)
    create index(:app_login_codes, [:app_id, :owner])
    create index(:app_login_codes, [:user_id])
    create index(:app_login_codes, [:assigned_at])
    create index(:app_login_codes, [:used_at])
    create index(:app_login_codes, [:inserted_at])
  end
end
