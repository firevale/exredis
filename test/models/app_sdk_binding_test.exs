defmodule Acs.Web.AppSdkBindingTest do
  use Acs.Web.ModelCase

  alias Acs.AppSdkBinding

  @valid_attrs %{binding: %{}, sdk: "vivo", app_id: "test-app"}
  @invalid_attrs %{sdk: "unknown"}

  test "changeset with valid attributes" do
    changeset = AppSdkBinding.changeset(%AppSdkBinding{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AppSdkBinding.changeset(%AppSdkBinding{}, @invalid_attrs)
    refute changeset.valid?
  end
end
