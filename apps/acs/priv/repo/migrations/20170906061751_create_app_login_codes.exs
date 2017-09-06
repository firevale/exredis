defmodule Acs.Repo.Migrations.CreateAppLoginCodes do
  use Ecto.Migration

  def change do
    create table(:app_login_codes) do
      add :code, :string
      add :owner, :string
  
      add :assigned_at, :utc_datetime
      add :used_at, :utc_datetime
  
      belongs_to :app, Acs.Apps.App, type: :string
      belongs_to :user, Acs.Accounts.User, type: :integer

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
