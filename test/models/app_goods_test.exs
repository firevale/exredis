defmodule Acs.AppGoodsTest do
  use Acs.ModelCase

  alias Acs.AppGoods

  @valid_attrs %{currency: "some content", description: "some content", icon: "some content", name: "some content", price: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AppGoods.changeset(%AppGoods{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AppGoods.changeset(%AppGoods{}, @invalid_attrs)
    refute changeset.valid?
  end
end
