defmodule Acs.MallOrderDetail do
  use Acs.Web, :model

@derive {Poison.Encoder, except: [:mall_order, :mall_goods, :__meta__]}

  schema "mall_order_details" do
    field :goods_name, :string
    field :goods_pic, :string
    field :price, :integer
    field :amount, :integer
    belongs_to :mall_goods, Acs.MallGoods,type: :string
    belongs_to :mall_order, Acs.MallOrder,type: :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:goods_name, :goods_pic, :price, :amount, :mall_goods_id, :mall_order_id])
    |> validate_required([:goods_name, :goods_pic, :price, :amount])
    |> foreign_key_constraint(:mall_goods_id)
    |> foreign_key_constraint(:mall_order_id)
  end
end
