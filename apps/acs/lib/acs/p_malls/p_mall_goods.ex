defmodule Acs.PMalls.PMallGoods do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.PMalls.PMallGoods

  @derive {Poison.Encoder, except: [:app, :user, :__meta__]}

  @primary_key false
  schema "pmall_goods" do
    field :id, :string, primary_key: true
    field :name, :string
    field :pic, :string, size: 800
    field :description, :binary

    field :price, :integer
    field :currency, :string, default: "POINT"

    field :postage, :integer      #邮费
    field :stock, :integer, default: 0    #库存
    field :sold, :integer, default: 0     #售出数量
    field :reads, :integer, default: 0
    field :active, :boolean, default: false
    field :is_virtual, :boolean, default: false  #是否虚拟物品
    field :begin_time, :utc_datetime    #开始时间
    field :end_time, :utc_datetime    #结束时间

    belongs_to :app, Acs.Apps.App, type: :string
    belongs_to :user, Acs.Accounts.User

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%PMallGoods{} = p_mall_goods, attrs) do
    p_mall_goods
    |> cast(attrs, [:id, :name, :description, :price, :currency, :postage, :pic, :stock, :sold, :reads, :active, :is_virtual, :begin_time, :end_time, :app_id, :user_id])
    |> validate_required([:id, :name, :description, :price, :postage, :begin_time, :end_time, :app_id, :user_id])
    |> foreign_key_constraint(:app_id)
    |> foreign_key_constraint(:user_id)
  end
end
