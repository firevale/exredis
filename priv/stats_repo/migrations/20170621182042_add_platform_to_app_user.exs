defmodule Acs.Repo.Migrations.AddPlatformToAppUser do
  use Ecto.Migration

  def change do
    alter table(:app_users) do 
      add :platform, :string, size: 20
    end

    alter table(:app_devices) do 
      add :platform, :string, size: 20
    end
    
    create index(:app_users, [:platform])
    create index(:app_devices, [:platform])
  end
end
