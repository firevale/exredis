defmodule Acs.MallOrderDetailTest do
  use Acs.ModelCase

  alias Acs.MallOrderDetail

  @valid_attrs %{amount: 42, goods_name: "some content", goods_pic: "some content", 
                price: 42, mall_goods_id: "1010001", mall_order_id: "A10000010"}
  @invalid_attrs %{amount: 42}

  test "changeset with valid attributes" do
    changeset = MallOrderDetail.changeset(%MallOrderDetail{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = MallOrderDetail.changeset(%MallOrderDetail{}, @invalid_attrs)
    refute changeset.valid?
  end
end
