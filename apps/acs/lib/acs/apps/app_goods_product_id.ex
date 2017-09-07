defmodule Acs.Apps.AppGoodsProductId do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Apps.AppGoodsProductId

  @derive {Poison.Encoder, except: [:app_goods, :__meta__]}

  schema "app_goods_product_ids" do
    field :sdk, :string
    field :product_id, :string

    belongs_to :app_goods, Acs.Apps.AppGoods, type: :string

    timestamps()
  end

  use Utils.Redisable
  @sdks Application.get_env(:acs, :sdks, [])

  @doc false
  def changeset(%AppGoodsProductId{} = app_goods_product_id, attrs) do
    app_goods_product_id
    |> cast(attrs, [:sdk, :product_id, :app_goods_id])
    |> validate_required([:sdk, :product_id, :app_goods_id])
    |> validate_inclusion(:sdk, @sdks)
  end
end
