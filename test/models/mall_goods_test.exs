defmodule Acs.MallGoodsTest do
  use Acs.ModelCase

  alias Acs.MallGoods

  @valid_attrs %{id: "good_id", name: "some content", description: "description", price: 100, 
  postage: 100, app_id: "app_id", user_id: 100002}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = MallGoods.changeset(%MallGoods{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = MallGoods.changeset(%MallGoods{}, @invalid_attrs)
    refute changeset.valid?
  end
end
