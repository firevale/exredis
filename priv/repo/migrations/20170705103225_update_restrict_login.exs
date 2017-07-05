defmodule Acs.Repo.Migrations.UpdateRestrictLogin do
  use Ecto.Migration

  def change do
    alter table(:apps) do 
      add :can_assign_code, :boolean, default: false
    end

    alter table(:app_wcp_configs) do
      add :closed_template, :string
    end

  end
end
