defmodule Acs.AppSdkBindingTest do
  use Acs.ModelCase

  alias Acs.AppSdkBinding

  @valid_attrs %{bindings: %{}, sdk: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AppSdkBinding.changeset(%AppSdkBinding{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AppSdkBinding.changeset(%AppSdkBinding{}, @invalid_attrs)
    refute changeset.valid?
  end
end
