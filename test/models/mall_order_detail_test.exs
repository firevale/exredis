defmodule Acs.MallOrderDetailTest do
  use Acs.ModelCase

  alias Acs.MallOrderDetail

  @valid_attrs %{amount: 42, good_name: "some content", good_pic: "some content", price: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = MallOrderDetail.changeset(%MallOrderDetail{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = MallOrderDetail.changeset(%MallOrderDetail{}, @invalid_attrs)
    refute changeset.valid?
  end
end
