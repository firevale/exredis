defmodule Acs.MallOrderDetail do
  use Acs.Web, :model

  schema "mall_order_details" do
    field :good_name, :string
    field :good_pic, :string
    field :price, :integer
    field :amount, :integer
    belongs_to :good, Acs.Good
    belongs_to :order, Acs.Order

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:good_name, :good_pic, :price, :amount])
    |> validate_required([:good_name, :good_pic, :price, :amount])
  end
end
