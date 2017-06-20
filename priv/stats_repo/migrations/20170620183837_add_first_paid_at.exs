defmodule Acs.Repo.Migrations.AddFirstPaidAt do
  use Ecto.Migration

  def change do
    alter table(:app_users) do 
      add :first_paid_at, :utc_datetime
    end

    alter table(:app_devices) do 
      add :first_paid_at, :utc_datetime
    end
    
    create index(:app_users, [:first_paid_at])
    
    create index(:app_devices, [:first_paid_at])
    create index(:app_devices, [:reg_date])
  end
end
