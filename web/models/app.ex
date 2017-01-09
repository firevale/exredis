defmodule Acs.App do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:sdk_payment_callbacks, :__meta__]}

  @primary_key false
  schema "apps" do
    field :id, :string, primary_key: true
    field :secret, :string
    field :name, :string
    field :icon, :string
    field :token_ttl, :integer, default: 604800 
    field :currency, :string, default: "CNY"
    field :payment_callback, :string

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

    has_many :sdk_bindings, Acs.AppSdkBinding, references: :id
    has_many :goods, Acs.AppGoods, references: :id
    has_many :sdk_payment_callbacks, Acs.AppSdkPaymentCallback, references: :id

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:id, :secret, :name, :icon, :token_ttl, :currency, :payment_callback, :chaoxin_group_id, :cs_phone_number,
                     :forum_name, :forum_url, :baidu_tieba_name, :baidu_tieba_url, :weibo_url, :weibo_name, :website_url,
                     :public_weixin_name, :public_weixin_url])
    |> validate_required([:secret, :name, :currency])
  end
end
