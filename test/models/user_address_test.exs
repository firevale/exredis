defmodule Acs.Web.UserAddressTest do
  use Acs.ModelCase

  alias Acs.UserAddress

  @valid_attrs %{name: "flanker", mobile: "18959118888", area: "fuzhou", address: "wuyilu",
                area_code: "350100", is_default: true, user_id: 100001}
  @invalid_attrs %{name: "flanker", mobile: "12959118888", area: "fuzhou", address: "wuyilu",
                area_code: "350100", is_default: true, user_id: 1}

  test "changeset with valid attributes" do
    changeset = UserAddress.changeset(%UserAddress{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = UserAddress.changeset(%UserAddress{}, @invalid_attrs)
    refute changeset.valid?
  end
end
