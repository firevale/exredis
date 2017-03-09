defmodule Acs.UserFavoritePostTest do
  use Acs.ModelCase

  alias Acs.UserFavoritePost

  @valid_attrs %{name: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = UserFavoritePost.changeset(%UserFavoritePost{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = UserFavoritePost.changeset(%UserFavoritePost{}, @invalid_attrs)
    refute changeset.valid?
  end
end
