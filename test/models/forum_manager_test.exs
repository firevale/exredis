defmodule Acs.Web.ForumManagerTest do
  use Acs.ModelCase

  alias Acs.ForumManager

  @valid_attrs %{forum_id: 1, user_id: 100002}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ForumManager.changeset(%ForumManager{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ForumManager.changeset(%ForumManager{}, @invalid_attrs)
    refute changeset.valid?
  end
end
