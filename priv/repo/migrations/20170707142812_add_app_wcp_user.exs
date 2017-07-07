defmodule Acs.Repo.Migrations.AddAppWcpUser do
  use Ecto.Migration

  def change do
    create table(:app_wcp_users) do 
      add :openid, :string
      add :nickname, :string
      add :sex, :integer
      add :avtar_url, :string
      add :city, :string
      add :country, :string
      add :app_id, references(:apps, type: :string, on_delete: :delete_all)
      timestamps()
    end

    create unique_index(:app_wcp_users, [:app_id, :openid])
  end
end
