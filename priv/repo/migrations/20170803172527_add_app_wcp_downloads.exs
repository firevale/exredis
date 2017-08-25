defmodule Acs.Repo.Migrations.AddAppWcpDownloads do
  use Ecto.Migration

  def change do
    alter table(:apps) do 
      add :wcp_download_enabled, :boolean, default: false
    end

    alter table(:app_wcp_configs) do 
      add :download_disabled_template, :binary   # 公众号下载未开启
      add :android_download_template, :binary    # android 下载
      add :ios_download_template, :binary
      add :tf_download_template, :binary
      add :tf_download_no_login_code_template, :binary
      add :tf_invalid_email_template, :binary
      add :tf_already_invited_template, :binary
      add :tf_download_email_received_template, :binary
      add :tf_invite_failed_template, :binary
      add :new_tf_email_template, :binary        # 新添加了testflight邮件回复
      add :update_tf_email_template, :binary
      add :accepted_tf_tester_template, :binary  # testflight邮件已添加并激活
      add :tf_email_used_template, :binary       # 电子邮件已经被其他用户使用
      add :tf_tester_full_template, :binary      # 没有testflight配额回复
    end

    alter table(:app_wcp_users) do 
      add :tf_email, :string, size: 100
    end

    create index(:app_wcp_users, [:tf_email])
    create unique_index(:app_wcp_users, [:app_id, :tf_email])

  end
end
