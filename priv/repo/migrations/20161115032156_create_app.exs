defmodule Acs.Repo.Migrations.CreateApp do
  use Ecto.Migration

  def change do
    create table(:apps, primary_key: false) do
      add :id, :string, primary_key: true
      add :secret, :string
      add :name, :string, size: 30
      add :icon, :string
      add :token_ttl, :integer, default: 604800
      add :currency, :string, size: 5 # goods currency
      add :payment_callback, :string 

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
  end
end
