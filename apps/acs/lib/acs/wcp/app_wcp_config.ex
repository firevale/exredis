defmodule Acs.Wcp.AppWcpConfig do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Wcp.AppWcpConfig

  @derive {Poison.Encoder, except: [:app, :__meta__]}

  schema "app_wcp_config" do
    field :verify_file, :string    # 验证文件
    field :wcp_app_id, :string    # 开发者ID
    field :wcp_app_key, :string   # 开发者密码
    field :token, :string         # 令牌
    field :aes_key, :string       # 消息加解密密钥

    field :menu, :map             # 自定义菜单

    field :subscribed_response, :binary   # 订阅回复消息
    field :scan_response, :binary         # 扫码回复消息
    field :default_response, :binary      # 默认回复消息

    field :new_code_template, :binary     # 新激活码模版
    field :owned_code_template, :binary   # 已有激活码模版
    field :no_code_template, :binary      # 没有激活码模版
    field :closed_template, :binary       # 关闭领取模版

    field :download_disabled_template, :binary   # 公众号下载未开启
    field :android_download_template, :binary    # android 下载
    field :ios_download_template, :binary        # ios download template
    field :tf_download_template, :binary         # test flight download template
    field :tf_download_no_login_code_template, :binary  # test flight 下载， 但未获得激活码
    field :tf_invalid_email_template, :binary    # test flight 下载，用户发送的电子邮件格式不对 
    field :tf_already_invited_template, :binary 
    field :tf_download_email_received_template, :binary   # test flight 下载， 收到用户邮件， 处理中
    field :new_tf_email_template, :binary        # 新添加了testflight邮件回复
    field :tf_invite_failed_template, :binary    # 添加tester 错误
    field :update_tf_email_template, :binary
    field :accepted_tf_tester_template, :binary  # testflight邮件已添加并激活
    field :tf_email_used_template, :binary       # 电子邮件已经被其他用户使用
    field :tf_tester_full_template, :binary      # 没有testflight配额回复

    belongs_to :app, Acs.Apps.App, type: :string

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%AppWcpConfig{} = app_wcp_config, attrs) do
    app_wcp_config
    |> cast(attrs, [:verify_file, :wcp_app_id, :wcp_app_key, :token, :aes_key, :menu, :subscribed_response, :scan_response, 
      :default_response, :new_code_template, :owned_code_template, :no_code_template, :closed_template, :app_id,
      :download_disabled_template, :android_download_template, :new_tf_email_template, :update_tf_email_template,
      :accepted_tf_tester_template, :tf_email_used_template, :tf_tester_full_template, :ios_download_template, 
      :tf_download_template, :tf_download_no_login_code_template, :tf_download_email_received_template, 
      :tf_invalid_email_template, :tf_already_invited_template, :tf_invite_failed_template])
    |> validate_required([:app_id])
    |> unique_constraint(:wcp_app_id)
  end
end
