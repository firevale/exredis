defmodule Acs.Web.ForumPostTest do
  use Acs.ModelCase

  alias Acs.ForumPost

  @valid_attrs %{content: "some content",  title: "some content", active: true, forum_id: 1, section_id: 1, user_id: 100002}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ForumPost.changeset(%ForumPost{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ForumPost.changeset(%ForumPost{}, @invalid_attrs)
    refute changeset.valid?
  end
end
