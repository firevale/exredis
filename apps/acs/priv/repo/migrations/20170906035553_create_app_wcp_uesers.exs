defmodule Acs.Repo.Migrations.CreateAppWcpUesers do
  use Ecto.Migration

  def change do
    create table(:app_wcp_users) do 
      add :openid, :string, size: 100
      add :nickname, :string, size: 50
      add :sex, :integer
      add :avatar_url, :string
      add :city, :string, size: 20
      add :country, :string, size: 20
      add :tf_email, :string, size: 50
      
      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

    create unique_index(:app_wcp_users, [:app_id, :openid])
    create unique_index(:app_wcp_users, [:app_id, :tf_email])
    create index(:app_wcp_users, [:openid])
    create index(:app_wcp_users, [:app_id, :nickname])
  end
end
