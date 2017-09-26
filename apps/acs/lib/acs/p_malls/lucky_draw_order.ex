defmodule Acs.PMalls.LuckyDrawOrder do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.PMalls.LuckyDrawOrder
  
  @derive {Poison.Encoder, except: [:app, :wcp_user, :__meta__]}

  schema "pmall_lucky_draw_orders" do
    field :name, :string
    field :pic, :string
    field :status, :integer, default: 0   #状态  -1已关闭 0待支付 1已支付 2待收货 3待确认 4已完成
    field :address, :map   #地址 json格式
    field :paid_at, :utc_datetime #支付时间
    field :deliver_at, :utc_datetime #递送时间
    field :close_at, :utc_datetime #关闭时间(手动／自动关闭)

    belongs_to :app, Acs.Apps.App, type: :string
    belongs_to :wcp_user, Acs.Wcp.AppWcpUser
    belongs_to :lucky_draw, Acs.PMalls.LuckyDraw

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%LuckyDrawOrder{} = lucky_draw_order, attrs) do
    lucky_draw_order
    |> cast(attrs, [:name, :pic, :status, :app_id, :wcp_user_id, :lucky_draw_id])
    |> validate_required([:name, :status, :app_id, :wcp_user_id, :lucky_draw_id])
  end
end
