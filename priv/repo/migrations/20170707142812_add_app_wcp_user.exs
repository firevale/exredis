defmodule Acs.Repo.Migrations.AddAppWcpUser do
  use Ecto.Migration

  def change do
    create table(:app_wcp_users) do 
      add :openid, :string, size: 100
      add :nickname, :string, size: 50
      add :sex, :integer
      add :avatar_url, :string
      add :city, :string, size: 20
      add :country, :string, size: 20
      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40
      timestamps()
    end

    create unique_index(:app_wcp_users, [:app_id, :openid])
    create index(:app_wcp_users, [:openid])
  end
end
