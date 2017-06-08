defmodule Acs.Web.UserFavoritePostTest do
  use Acs.ModelCase

  alias Acs.UserFavoritePost

  @valid_attrs %{user_id: 100001, post_id: 1}
  @invalid_attrs %{user_id: 1}

  test "changeset with valid attributes" do
    changeset = UserFavoritePost.changeset(%UserFavoritePost{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = UserFavoritePost.changeset(%UserFavoritePost{}, @invalid_attrs)
    refute changeset.valid?
  end
end
