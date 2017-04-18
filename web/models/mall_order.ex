defmodule Acs.MallOrder do
  use Acs.Web, :model

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

@derive {Poison.Encoder, except: [:app, :user, :goods, :details, :op_logs, :user_address, :__meta__]}

@primary_key false
  schema "mall_orders" do
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
    field :snapshots, :binary     #订单快照
    field :paid_result, :binary   #支付结果
    field :memo, :string   #备注
    field :debug_mode, :boolean, default: false
    field :transaction_currency, :string
    field :transaction_id, :string
    field :transaction_status, :string
    
    belongs_to :app,  Acs.App, type: :string
    belongs_to :user, Acs.User, type: :integer
    belongs_to :user_address, Acs.UserAddress, type: :integer
    has_many :goods, Acs.MallGoods, references: :id
    has_many :details, Acs.MallOrderDetail,references: :id
    has_many :op_logs, Acs.MallOPLog,references: :id
    
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:id, :platform, :device_id, :user_ip, :goods_name, :price,
                    :postage, :discount, :final_price, :currency, :paid_type, :paid_at, :confirm_at, 
                    :deliver_at, :close_at, :status, :snapshots, :paid_result, :memo, :debug_mode, 
                    :transaction_currency, :transaction_id, :transaction_status, :app_id, 
                    :user_id, :user_address_id])
    |> validate_required([:id, :platform, :app_id, :user_id, :user_address_id])
    |> foreign_key_constraint(:app_id)
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:user_address_id)
  end
end
