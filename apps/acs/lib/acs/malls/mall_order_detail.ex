defmodule Acs.Malls.MallOrderDetail do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Malls.MallOrderDetail

  @derive {Poison.Encoder, except: [:mall_order, :mall_goods, :__meta__]}
  schema "mall_order_details" do
    field :goods_name, :string
    field :goods_pic, :string
    field :price, :integer
    field :amount, :integer

    belongs_to :mall_goods, Acs.Malls.MallGoods,type: :string
    belongs_to :mall_order, Acs.Malls.MallOrder,type: :string

    timestamps()
  end

  @doc false
  def changeset(%MallOrderDetail{} = mall_order_detail, attrs) do
    mall_order_detail
    |> cast(attrs, [:goods_name, :goods_pic, :price, :amount, :mall_goods_id, :mall_order_id])
    |> validate_required([:goods_name, :goods_pic, :price, :amount])
    |> foreign_key_constraint(:mall_goods_id)
    |> foreign_key_constraint(:mall_order_id)
  end
end
