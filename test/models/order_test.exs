defmodule Acs.OrderTest do
  use Acs.ModelCase

  alias Acs.Order

  @valid_attrs %{cp_order_id: "some content", cp_result: "some content", deliver_at: %{day: 17, hour: 14, min: 0, month: 4, sec: 0, year: 2010}, oid: "some content", paid_at: %{day: 17, hour: 14, min: 0, month: 4, sec: 0, year: 2010}, paid_channel: "some content", platform: "some content", sdk: "some content", trade_currency: "some content", trade_fee: 42, trade_no: "some content", trade_status: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Order.changeset(%Order{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Order.changeset(%Order{}, @invalid_attrs)
    refute changeset.valid?
  end
end
