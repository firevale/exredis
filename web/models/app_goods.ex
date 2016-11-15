defmodule Acs.AppGoods do
  use Acs.Web, :model

  @primary_key false
  schema "app_goods" do
    field :id, :string, primary_key: true
    field :name, :string
    field :description, :string
    field :price, :integer
    field :currency, :string
    field :icon, :string

    has_many   :product_ids, Acs.AppGoodsProductId, references: :id
    belongs_to :app, Acs.App

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :description, :price, :currency, :icon])
    |> validate_required([:name, :description, :price, :currency, :icon])
  end
end
