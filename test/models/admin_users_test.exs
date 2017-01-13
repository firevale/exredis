defmodule Acs.AdminUsersTest do
  use Acs.ModelCase

  alias Acs.AdminUsers

  @valid_attrs %{account_id: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AdminUsers.changeset(%AdminUsers{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AdminUsers.changeset(%AdminUsers{}, @invalid_attrs)
    refute changeset.valid?
  end
end
