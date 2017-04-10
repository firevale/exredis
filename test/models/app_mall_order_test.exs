defmodule Acs.AppMallOrderTest do
  use Acs.ModelCase

  alias Acs.AppMallOrder

  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AppMallOrder.changeset(%AppMallOrder{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AppMallOrder.changeset(%AppMallOrder{}, @invalid_attrs)
    refute changeset.valid?
  end
end
