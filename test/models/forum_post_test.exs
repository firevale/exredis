defmodule Acs.ForumPostTest do
  use Acs.ModelCase

  alias Acs.ForumPost

  @valid_attrs %{content: "some content", is_hot: true, is_top: true, is_vote: true, last_reply_at: %{day: 17, hour: 14, min: 0, month: 4, sec: 0, year: 2010}, title: "some content"}
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
