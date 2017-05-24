defmodule Acs.ForumTest do
  use Acs.ModelCase

  alias Acs.Forum

  @valid_attrs %{status: 42, title: "some content", active: true, app_id: "978A7D84040FE589ED0C76295131E43D" }
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Forum.changeset(%Forum{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Forum.changeset(%Forum{}, @invalid_attrs)
    refute changeset.valid?
  end
end
