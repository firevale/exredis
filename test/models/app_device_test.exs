defmodule Acs.AppDeviceTest do
  use Acs.ModelCase

  alias Acs.AppDevice

  @valid_attrs %{sdk: "facebook"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AppDevice.changeset(%AppDevice{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AppDevice.changeset(%AppDevice{}, @invalid_attrs)
    refute changeset.valid?
  end
end
