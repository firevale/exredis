defmodule Acs.Apps.AppGoods do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Apps.AppGoods

  @derive {Poison.Encoder, except: [:app, :__meta__]}
  @primary_key false
  schema "app_goods" do
    field :id, :string, primary_key: true
    field :name, :string
    field :description, :string
    field :price, :integer
    field :icon, :string

    has_many   :product_ids, Acs.Apps.AppGoodsProductId, references: :id
    belongs_to :app, Acs.Apps.App, type: :string

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%AppGoods{} = app_goods, attrs) do
    app_goods
    |> cast(attrs, [:id, :name, :description, :price, :icon, :app_id])
    |> validate_required([:name, :price])
  end
end
