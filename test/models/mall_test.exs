defmodule Acs.Web.MallTest do
  use Acs.Web.ModelCase

  alias Acs.Mall

  @valid_attrs %{title: "mall", active: true, app_id: "978A7D84040FE589ED0C76295131E43D"}
  @invalid_attrs %{title: "mall", active: true}

  test "changeset with valid attributes" do
    changeset = Mall.changeset(%Mall{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Mall.changeset(%Mall{}, @invalid_attrs)
    refute changeset.valid?
  end
end
