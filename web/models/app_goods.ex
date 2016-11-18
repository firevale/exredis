defmodule Acs.AppGoods do
  use Acs.Web, :model

  @primary_key false
  schema "app_goods" do
    field :id, :string, primary_key: true
    field :name, :string
    field :description, :string
    field :price, :integer
    field :icon, :string

    has_many   :product_ids, Acs.AppGoodsProductId, references: :id
    belongs_to :app, Acs.App, type: :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:id, :name, :description, :price, :icon, :app_id])
    |> validate_required([:name, :price])
  end
end
