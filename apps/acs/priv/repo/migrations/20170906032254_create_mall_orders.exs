defmodule Acs.Repo.Migrations.CreateMallOrders do
  use Ecto.Migration

  def change do
    create table(:mall_orders, primary_key: false) do
      add :id, :string, size: 100, primary_key: true
      add :platform, :string, size: 10
      add :device_id, :string, size: 100
      add :user_ip, :string, size: 20 

      add :goods_name, :string
      add :price, :integer, default: 0
      add :postage, :integer, default: 0      #邮费
      add :discount, :integer, default: 0     #折扣
      add :final_price, :integer, default: 0  #最终价格
      add :currency, :string
      add :paid_type, :string     #支付类型
      add :paid_at, :utc_datetime #支付时间
      add :confirm_at, :utc_datetime #确认时间
      add :deliver_at, :utc_datetime #递送时间
      add :close_at, :utc_datetime #关闭时间(手动／自动关闭)
      add :status, :integer, default: 0  #订单状态 -3已退款 -2已退货 -1已关闭 0待支付 1已支付 2待收货 3待确认 4已完成
      add :snapshots, :map     #订单快照
      add :paid_result, :binary   #支付结果
      add :memo, :string   #备注
      add :address, :map   #地址 json格式
      add :debug_mode, :boolean, default: false
      add :fee, :integer, default: 0
      add :transaction_currency, :string
      add :transaction_id, :string, size: 120
      add :transaction_status, :string, size: 20

      add :app_id, references(:apps, type: :string, on_delete: :nothing), size: 40
      add :user_id, references(:users, type: :integer, on_delete: :nothing)

      timestamps()
    end

    create index(:mall_orders, [:app_id])
    create index(:mall_orders, [:user_id])
    create index(:mall_orders, [:user_id, :status])
    create unique_index(:mall_orders, [:transaction_id])

  end
end
