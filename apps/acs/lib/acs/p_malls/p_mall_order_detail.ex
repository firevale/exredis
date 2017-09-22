defmodule Acs.PMalls.PMallOrderDetail do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.PMalls.PMallOrderDetail

  @derive {Poison.Encoder, except: [:mall_order, :mall_goods, :__meta__]}
  schema "pmall_order_details" do
    field :goods_name, :string
    field :goods_pic, :string
    field :price, :integer
    field :amount, :integer

    belongs_to :pmall_goods, Acs.PMalls.PMallGoods, type: :string
    belongs_to :pmall_order, Acs.PMalls.PMallOrder, type: :string, foreign_key: :pmall_order_id

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%PMallOrderDetail{} = pmall_order_detail, attrs) do
    pmall_order_detail
    |> cast(attrs, [:goods_name, :goods_pic, :price, :amount, :pmall_goods_id, :pmall_order_id])
    |> validate_required([:goods_name, :goods_pic, :price, :amount])
    |> foreign_key_constraint(:pmall_goods_id)
    |> foreign_key_constraint(:pmall_order_id)
  end
end
