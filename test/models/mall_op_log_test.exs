defmodule Acs.Web.MallOPLogTest do
  use Acs.ModelCase

  alias Acs.MallOPLog

  @valid_attrs %{status: 1, changed_status: 3, mall_order_id: "order_id"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = MallOPLog.changeset(%MallOPLog{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = MallOPLog.changeset(%MallOPLog{}, @invalid_attrs)
    refute changeset.valid?
  end
end
