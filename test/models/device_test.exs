defmodule Acs.Web.DeviceTest do
  use Acs.Web.ModelCase

  alias Acs.Device

  @valid_attrs %{model: "some content", platform: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Device.changeset(%Device{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Device.changeset(%Device{}, @invalid_attrs)
    refute changeset.valid?
  end
end
