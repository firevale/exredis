defmodule Acs.AppMallGoodsTest do
  use Acs.ModelCase

  alias Acs.AppMallGoods

  @valid_attrs %{title: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AppMallGoods.changeset(%AppMallGoods{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AppMallGoods.changeset(%AppMallGoods{}, @invalid_attrs)
    refute changeset.valid?
  end
end
