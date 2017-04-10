defmodule Acs.UserAddressTest do
  use Acs.ModelCase

  alias Acs.UserAddress

  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = UserAddress.changeset(%UserAddress{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = UserAddress.changeset(%UserAddress{}, @invalid_attrs)
    refute changeset.valid?
  end
end
