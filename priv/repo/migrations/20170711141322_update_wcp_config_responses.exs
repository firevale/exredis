defmodule Acs.Repo.Migrations.UpdateWcpConfigResponse do
  use Ecto.Migration

  def change do
    alter table(:app_wcp_configs) do 
      modify :subscribed_response, :binary
      modify :scan_response, :binary
      modify :default_response, :binary

      modify :new_code_template, :binary
      modify :owned_code_template, :binary
      modify :no_code_template, :binary
      modify :closed_template, :binary
    end

    alter table(:app_wcp_message_rules) do 
      modify :response, :binary
    end

    alter table(:app_wcp_messages) do 
      modify :content, :binary
    end
    
  end
end
