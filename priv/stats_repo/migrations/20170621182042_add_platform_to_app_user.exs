defmodule Acs.Repo.Migrations.AddFirstPaidAt do
  use Ecto.Migration

  def change do
    alter table(:app_users) do 
      add :platform, :string
    end

    alter table(:app_devices) do 
      add :platform, :string
    end
    
    create index(:app_users, [:platform])
    create index(:app_devices, [:platform])
  end
end
