defmodule Acs.MallGoodsTest do
  use Acs.ModelCase

  alias Acs.MallGoods

  @valid_attrs %{title: "some content"}
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
