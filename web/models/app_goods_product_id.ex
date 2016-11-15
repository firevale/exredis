defmodule Acs.AppGoodsProductId do
  use Acs.Web, :model

  schema "app_goods_product_ids" do
    field :sdk, :string
    field :product_id, :string

    belongs_to :app_goods, Acs.AppGoods

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:sdk, :product_id])
    |> validate_required([:sdk, :product_id])
  end
end
