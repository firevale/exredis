defmodule Acs.AdminUsersTest do
  use Acs.ModelCase

  alias Acs.AdminUser

  @valid_attrs %{account_id: "adminusertest@firevale.com"}
  @invalid_attrs %{account_id: "xxx"}

  test "changeset with valid attributes" do
    changeset = AdminUser.changeset(%AdminUser{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AdminUser.changeset(%AdminUser{}, @invalid_attrs)
    refute changeset.valid?
  end
end
