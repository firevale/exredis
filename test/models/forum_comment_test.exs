defmodule Acs.Web.ForumCommentTest do
  use Acs.ModelCase

  alias Acs.ForumComment

  @valid_attrs %{content: "some content", active: true, post_id: 1, user_id: 100002}
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
