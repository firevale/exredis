defmodule Acs.Web.UserSdkBindingTest do
  use Acs.ModelCase

  alias Acs.UserSdkBinding

  @valid_attrs %{sdk: "pp", sdk_user_id: "some content", user_id: 1234134, app_id: "yyy"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = UserSdkBinding.changeset(%UserSdkBinding{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = UserSdkBinding.changeset(%UserSdkBinding{}, @invalid_attrs)
    refute changeset.valid?
  end
end
