defmodule Acs.ForumCommentTest do
  use Acs.ModelCase

  alias Acs.ForumComment

  @valid_attrs %{content: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ForumComment.changeset(%ForumComment{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ForumComment.changeset(%ForumComment{}, @invalid_attrs)
    refute changeset.valid?
  end
end
