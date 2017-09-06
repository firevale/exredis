defmodule Acs.Repo.Migrations.CreateUserSdkBindings do
  use Ecto.Migration

  def change do
    create table(:user_sdk_bindings) do 
      add :sdk, :string, size: 50
      add :sdk_user_id, :string, size: 50

      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40
      add :user_id, references(:users, type: :integer, on_delete: :delete_all)

      timestamps()
    end
    
    create unique_index(:user_sdk_bindings, [:sdk, :app_id, :sdk_user_id])
    create index(:user_sdk_bindings, [:app_id])
    create index(:user_sdk_bindings, [:user_id])
  end
end
