defmodule Acs.OrderTest do
  use Acs.ModelCase

  alias Acs.AppOrder

  @valid_attrs %{id: "xxxxxxyyyy",
                 cp_order_id: "some content", 
                 deliver_at: ~N[2001-02-13 00:00:00],
                 id: "some content", 
                 paid_at: ~N[2010-04-30 12:31:21],
                 paid_channel: "alipay", 
                 platform: "android", 
                 sdk: "facebook", 
                 trade_currency: "USD", 
                 trade_fee: 42, 
                 trade_no: "some content", 
                 trade_status: "some content"}

  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AppOrder.changeset(%AppOrder{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AppOrder.changeset(%AppOrder{}, @invalid_attrs)
    refute changeset.valid?
  end
end
