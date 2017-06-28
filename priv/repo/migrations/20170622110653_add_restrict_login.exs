defmodule Acs.Repo.Migrations.AddRestrictLogin do
  use Ecto.Migration

  def change do
    alter table(:apps) do 
      add :restrict_login, :boolean, default: false
    end
    
    create table(:app_login_codes) do 
      add :code, :string
      add :owner, :string

      add :assigned_at, :utc_datetime
      add :used_at, :utc_datetime

      add :app_id, references(:apps, type: :string, on_delete: :delete_all)
      add :user_id, references(:users, type: :integer, on_delete: :delete_all)

      timestamps()
    end

    create index(:app_login_codes, [:app_id, :code], unique: true)
    create index(:app_login_codes, [:app_id, :user_id], unique: true)
    create index(:app_login_codes, [:app_id, :owner])
    create index(:app_login_codes, [:user_id])
    create index(:app_login_codes, [:assigned_at])
    create index(:app_login_codes, [:used_at])
    create index(:app_login_codes, [:inserted_at])

    create table(:app_wcp_configs) do 
      add :wcp_app_id, :string
      add :wcp_app_key, :string
      add :token, :string
      add :aes_key, :string

      add :menu, :map

      add :subscribed_response, :string
      add :scan_response, :string
      add :default_response, :string

      add :new_code_template, :string
      add :owned_code_template, :string

      add :app_id, references(:apps, type: :string, on_delete: :delete_all)

      timestamps()
    end

    create index(:app_wcp_configs, [:wcp_app_id], unique: true)
    create index(:app_wcp_configs, [:wcp_app_key], unique: true)
    create index(:app_wcp_configs, [:token], unique: true)
    create index(:app_wcp_configs, [:aes_key], unique: true)
    create index(:app_wcp_configs, [:app_id], unique: true, name: :app_wcp_configs_app_id_unique)

    create table(:app_wcp_messages) do 
      add :from, :string
      add :to, :string
      add :msg_type, :string
      add :content, :string
      add :create_time, :integer
      add :app_id, references(:apps, type: :string, on_delete: :delete_all)

      timestamps()
    end

    create index(:app_wcp_messages, [:app_id, :from])
    create index(:app_wcp_messages, [:app_id, :to])

    create table(:app_wcp_message_rules) do 
      add :keywords, :string
      add :response, :string
      add :app_id, references(:apps, type: :string, on_delete: :delete_all)
      timestamps()
    end

    create unique_index(:app_wcp_message_rules, [:app_id, :keywords])

  end
end
