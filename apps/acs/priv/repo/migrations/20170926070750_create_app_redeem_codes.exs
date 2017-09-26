defmodule Acs.Repo.Migrations.CreateAppRedeemCodes do
  use Ecto.Migration

  def change do
    create table(:app_redeem_codes) do

      add :code, :string
      add :code_type, :string
      add :assigned_at, :utc_datetime
      add :used_at, :utc_datetime

      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

    create index(:app_redeem_codes, [:app_id])
    create index(:app_redeem_codes, [:app_id, :code_type])

  end
end
