defmodule Acs.AppWcpConfig do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:app, :__meta__]}

  schema "app_wcp_configs" do
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

    field :tf_closed_template, :binary           # testflight下载未开启
    field :new_tf_tester_template, :binary       # 新添加了testflight邮件回复
    field :accepted_tf_tester_template, :binary  # testflight邮件已添加并激活
    field :tf_email_used_template, :binary       # 电子邮件已经被其他用户使用
    field :tf_tester_full_template, :binary      # 没有testflight配额回复

    belongs_to :app, Acs.App, type: :string

    timestamps()
  end

  use Utils.Redisable

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:verify_file, :wcp_app_id, :wcp_app_key, :token, :aes_key, :menu, :subscribed_response, :scan_response, 
                    :default_response, :new_code_template, :owned_code_template, :no_code_template, :closed_template, :app_id])
    |> validate_required([:app_id])
    |> unique_constraint(:wcp_app_id)
  end
end
