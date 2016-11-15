defmodule Acs.AppUserTest do
  use Acs.ModelCase

  alias Acs.AppUser

  @valid_attrs %{}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AppUser.changeset(%AppUser{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AppUser.changeset(%AppUser{}, @invalid_attrs)
    refute changeset.valid?
  end
end
