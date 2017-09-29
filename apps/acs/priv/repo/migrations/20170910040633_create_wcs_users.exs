defmodule Acs.Repo.Migrations.CreateWcsUesers do
  use Ecto.Migration

  def change do
    create table(:wcs_users) do 
      add :openid, :string, size: 100
      add :unionid, :string, size: 100
      add :nickname, :string, size: 50
      add :sex, :integer
      add :avatar_url, :string
      add :city, :string, size: 20
      add :country, :string, size: 20
      
      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

    create unique_index(:wcs_users, [:app_id, :openid])
    create unique_index(:wcs_users, [:app_id, :unionid])
    create unique_index(:wcs_users, [:app_id, :user_id])
  end
end
