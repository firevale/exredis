defmodule Acs.MallTest do
  use Acs.ModelCase

  alias Acs.Mall

  @valid_attrs %{title: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Mall.changeset(%Mall{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Mall.changeset(%Mall{}, @invalid_attrs)
    refute changeset.valid?
  end
end
