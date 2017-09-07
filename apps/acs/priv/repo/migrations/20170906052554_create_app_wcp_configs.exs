defmodule Acs.Repo.Migrations.CreateAppWcpConfig do
  use Ecto.Migration

  def change do
    create table(:app_wcp_configs) do
      add :verify_file, :string    # 验证文件
      add :wcp_app_id, :string    # 开发者ID
      add :wcp_app_key, :string   # 开发者密码
      add :token, :string         # 令牌
      add :aes_key, :string       # 消息加解密密钥
  
      add :menu, :map             # 自定义菜单
  
      add :subscribed_response, :binary   # 订阅回复消息
      add :scan_response, :binary         # 扫码回复消息
      add :default_response, :binary      # 默认回复消息
  
      add :new_code_template, :binary     # 新激活码模版
      add :owned_code_template, :binary   # 已有激活码模版
      add :no_code_template, :binary      # 没有激活码模版
      add :closed_template, :binary       # 关闭领取模版
  
      add :download_disabled_template, :binary   # 公众号下载未开启
      add :android_download_template, :binary    # android 下载
      add :ios_download_template, :binary        # ios download template
      add :tf_download_template, :binary         # test flight download template
      add :tf_download_no_login_code_template, :binary  # test flight 下载， 但未获得激活码
      add :tf_invalid_email_template, :binary    # test flight 下载，用户发送的电子邮件格式不对 
      add :tf_already_invited_template, :binary 
      add :tf_download_email_received_template, :binary   # test flight 下载， 收到用户邮件， 处理中
      add :new_tf_email_template, :binary        # 新添加了testflight邮件回复
      add :tf_invite_failed_template, :binary    # 添加tester 错误
      add :update_tf_email_template, :binary
      add :accepted_tf_tester_template, :binary  # testflight邮件已添加并激活
      add :tf_email_used_template, :binary       # 电子邮件已经被其他用户使用
      add :tf_tester_full_template, :binary      # 没有testflight配额回复
  
      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40

      timestamps()
    end

    create unique_index(:app_wcp_configs, [:wcp_app_id])
    create unique_index(:app_wcp_configs, [:wcp_app_key])
    create unique_index(:app_wcp_configs, [:token])
    create unique_index(:app_wcp_configs, [:aes_key])
    create unique_index(:app_wcp_configs, [:app_id])

  end
end
