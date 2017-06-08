defmodule Acs.Web.AdminSettingTest do
  use Acs.ModelCase

  alias Acs.AdminSetting

  @valid_attrs %{name: "some content" ,value: "Setting Value", active: true, memo: "memo",  group: "group"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AdminSetting.changeset(%AdminSetting{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AdminSetting.changeset(%AdminSetting{}, @invalid_attrs)
    refute changeset.valid?
  end
end
