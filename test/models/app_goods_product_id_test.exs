defmodule Acs.Web.AppGoodsProductIdTest do
  use Acs.ModelCase

  alias Acs.AppGoodsProductId

  @valid_attrs %{product_id: "some content", sdk: "alipay", app_goods_id: "13134123"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AppGoodsProductId.changeset(%AppGoodsProductId{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AppGoodsProductId.changeset(%AppGoodsProductId{}, @invalid_attrs)
    refute changeset.valid?
  end
end
