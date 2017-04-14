defmodule Acs.MallOrderTest do
  use Acs.ModelCase

  alias Acs.MallOrder

  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = MallOrder.changeset(%MallOrder{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = MallOrder.changeset(%MallOrder{}, @invalid_attrs)
    refute changeset.valid?
  end
end
