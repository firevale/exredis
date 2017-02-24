defmodule Acs.ForumReplyTest do
  use Acs.ModelCase

  alias Acs.ForumReply

  @valid_attrs %{content: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ForumReply.changeset(%ForumReply{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ForumReply.changeset(%ForumReply{}, @invalid_attrs)
    refute changeset.valid?
  end
end
