defmodule Acs.Apps.App do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Apps.App

  @derive {Poison.Encoder, except: [:sdk_payment_callbacks, :__meta__, :forum, :mall]}
  @primary_key false
  schema "apps" do
    field :id, :string, primary_key: true
    field :alias, :string
    field :secret, :string
    field :name, :string
    field :icon, :string
    field :token_ttl, :integer, default: 604800 
    field :currency, :string, default: "CNY"
    field :payment_callback, :string

    field :active, :boolean, default: true
    field :has_forum, :boolean, default: false
    field :has_mall, :boolean, default: false
    field :has_pmall, :boolean, default: false
    field :restrict_login, :boolean, default: false   # 是否需要激活码登录, 限制登录
    field :can_assign_code, :boolean, default: false  # 是否开放激活码领取
    field :wcp_download_enabled, :boolean, default: false # 是否开放微信公众号下载
    field :obtain_code_url, :string
    field :itc_app_id, :string

    field :chaoxin_group_id, :string # 超信运营群号
    
    field :cs_phone_number, :string
    field :forum_name, :string
    field :forum_url, :string
    field :baidu_tieba_name, :string
    field :baidu_tieba_url, :string
    field :weibo_url, :string
    field :weibo_name, :string
    field :website_name, :string
    field :website_url, :string
    field :public_weixin_name, :string
    field :public_weixin_url, :string

    has_many :sdk_bindings, Acs.Apps.AppSdkBinding, references: :id
    has_many :goods, Acs.Apps.AppGoods, references: :id
    has_many :sdk_payment_callbacks, Acs.Apps.AppSdkPaymentCallback, references: :id

    # has_one  :forum, Acs.Forums.Forum, references: :id
    # has_one  :mall, Acs.Malls.Mall, references: :id

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%App{} = app, attrs) do
    app
    |> cast(attrs, [:id, :secret, :name, :icon, :token_ttl, :currency, :payment_callback, :chaoxin_group_id, :cs_phone_number,
      :forum_name, :forum_url, :baidu_tieba_name, :baidu_tieba_url, :weibo_url, :weibo_name, :website_url,
      :public_weixin_name, :public_weixin_url, :active, :has_forum, :has_mall, :has_pmall, :restrict_login, :can_assign_code, 
      :obtain_code_url, :wcp_download_enabled, :itc_app_id])
    |> validate_required([:id, :secret, :name, :currency])
    |> unique_constraint(:name)
    |> unique_constraint(:alias)
    |> validate_app_alias(:alias)
  end

  defp validate_app_alias(changeset, _field, _options \\ []) do 
    validate_change(changeset, :alias, fn(:alias, alias_) -> 
      if Map.get(changeset.changes, :has_forum, false) or Map.get(changeset.changes, :has_mall, false)   do
        if alias_ in [nil, ""] do 
          [alias: "can't not be blank"]
        else
          []
        end
      else 
        []
      end
    end)
  end
end
