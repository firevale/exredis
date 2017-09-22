defmodule Acs.PMalls.PMallOrder do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.PMalls.PMallOrder

  defmodule Status do
    def refunded, do: -3
    def returned, do: -2
    def closed, do: -1
    def tobepaid, do: 0
    def paid, do: 1
    def tobereceived, do: 2
    def tobeconfirmed, do: 3
    def finished, do: 4
    def cheat, do: 403
  end

  @derive {Poison.Encoder, except: [:app, :wcp_user, :goods, :user_address, :__meta__]}
  @primary_key false
  schema "pmall_orders" do
    field :id, :string, primary_key: true
    field :platform, :string, size: 10
    field :device_id, :string
    field :user_ip, :string       #IP地址

    field :goods_name, :string
    field :price, :integer, default: 0
    field :postage, :integer, default: 0      #邮费
    field :discount, :integer, default: 0     #折扣
    field :final_price, :integer, default: 0  #最终价格
    field :currency, :string
    field :paid_type, :string     #支付类型
    field :paid_at, :utc_datetime #支付时间
    field :confirm_at, :utc_datetime #确认时间
    field :deliver_at, :utc_datetime #递送时间
    field :close_at, :utc_datetime #关闭时间(手动／自动关闭)
    field :status, :integer, default: 0  #订单状态 -3已退款 -2已退货 -1已关闭 0待支付 1已支付 2待收货 3待确认 4已完成
    field :snapshots, :map     #订单快照
    field :paid_result, :binary   #支付结果
    field :memo, :string   #备注
    field :address, :map   #地址 json格式
    field :debug_mode, :boolean, default: false
    field :fee, :integer, default: 0
    field :transaction_currency, :string
    field :transaction_id, :string
    field :transaction_status, :string
    
    belongs_to :app,  Acs.Apps.App, type: :string
    belongs_to :wcp_user, Acs.Wcp.AppWcpUser
    belongs_to :goods, Acs.PMalls.PMallGoods, type: :string

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%PMallOrder{} = p_mall_order, attrs) do
    p_mall_order
    |> cast(attrs, [:id, :platform, :device_id, :user_ip, :goods_name, :price,
      :postage, :discount, :final_price, :currency, :paid_type, :paid_at, :confirm_at, 
      :deliver_at, :close_at, :status, :snapshots, :paid_result, :memo, :debug_mode, 
      :transaction_currency, :transaction_id, :transaction_status, :app_id, :fee,
      :wcp_user_id, :address])
    |> validate_required([:id, :app_id, :wcp_user_id, :address])
    |> foreign_key_constraint(:app_id)
    |> foreign_key_constraint(:wcp_user_id)
  end
end
