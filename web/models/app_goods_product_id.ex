defmodule Acs.AppGoodsProductId do
  use Acs.Web, :model


  @derive {Poison.Encoder, except: [:app_goods, :__meta__]}
  schema "app_goods_product_ids" do
    field :sdk, :string
    field :product_id, :string

    belongs_to :app_goods, Acs.AppGoods, type: :string

    timestamps()
  end

  @sdks Application.get_env(:acs, :sdks, [])

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:sdk, :product_id, :app_goods_id])
    |> validate_required([:sdk, :product_id, :app_goods_id])
    |> validate_inclusion(:sdk, @sdks)
  end
end
