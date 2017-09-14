defmodule Acs.Repo.Migrations.CreateApps do
  use Ecto.Migration

  def change do
    create table(:apps, primary_key: false) do
      add :id, :string, size: 40, primary_key: true
      add :alias, :string, size: 20
      add :secret, :string
      add :name, :string, size: 30
      add :icon, :string
      add :token_ttl, :integer, default: 604800
      add :currency, :string, size: 5 # goods currency
      add :payment_callback, :string 

      add :active, :boolean, default: true
      add :has_forum, :boolean, default: false
      add :has_mall, :boolean, default: false
      add :has_pmall, :boolean, default: false
      add :restrict_login, :boolean, default: false
      add :can_assign_code, :boolean, default: false
      add :wcp_download_enabled, :boolean, default: false
      add :obtain_code_url, :string
      add :itc_app_id, :string

      add :chaoxin_group_id, :string   # 超信群组id， 用于发送超信通知
      
      add :cs_phone_number, :string
      add :forum_name, :string
      add :forum_url, :string
      add :baidu_tieba_name, :string
      add :baidu_tieba_url, :string
      add :weibo_url, :string
      add :weibo_name, :string
      add :website_name, :string
      add :website_url, :string
      add :public_weixin_name, :string
      add :public_weixin_url, :string

      timestamps()
    end

    create unique_index(:apps, [:name])
    create unique_index(:apps, [:alias])
  end
end
