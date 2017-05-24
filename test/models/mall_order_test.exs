defmodule Acs.MallOrderTest do
  use Acs.ModelCase

  alias Acs.MallOrder

  @valid_attrs %{id: "A10000010", platform: "ios", app_id: "978A7D84040FE589ED0C76295131E43D", 
                user_id: "100001", address: "my address"}
  @invalid_attrs %{id: "A10000010", platform: "ios", 
                user_id: "100001", address: "my address"}

  test "changeset with valid attributes" do
    changeset = MallOrder.changeset(%MallOrder{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = MallOrder.changeset(%MallOrder{}, @invalid_attrs)
    refute changeset.valid?
  end
end
