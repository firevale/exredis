defmodule Acs.Repo.Migrations.CreateUserSdkBinding do
  use Ecto.Migration

  def change do
    create table(:user_sdk_bindings) do 
      add :sdk, :string
      add :sdk_user_id, :string

      add :app_id, references(:apps, type: :string, on_delete: :delete_all)
      add :user_id, references(:users, type: :integer, on_delete: :delete_all)

      timestamps()
    end
    
    create index(:user_sdk_bindings, [:sdk, :app_id, :sdk_user_id], unique: true)
    create index(:user_sdk_bindings, [:app_id])
    create index(:user_sdk_bindings, [:user_id])
  end
end
