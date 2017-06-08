defmodule Acs.Web.AppDeviceTest do
  use Acs.ModelCase

  alias Acs.AppDevice

  @valid_attrs %{pay_amount: 0, active_seconds: 12}
  @invalid_attrs %{pay_amount: -1, active_seconds: -11}

  test "changeset with valid attributes" do
    changeset = AppDevice.changeset(%AppDevice{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AppDevice.changeset(%AppDevice{}, @invalid_attrs)
    refute changeset.valid?
  end
end
