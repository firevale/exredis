defmodule Acs.Web.ForumSectionTest do
  use Acs.Web.ModelCase

  alias Acs.ForumSection

  @valid_attrs %{sort: 42, title: "some content", forum_id: 1, active: true}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ForumSection.changeset(%ForumSection{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ForumSection.changeset(%ForumSection{}, @invalid_attrs)
    refute changeset.valid?
  end
end
