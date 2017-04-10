defmodule Acs.AppMallTest do
  use Acs.ModelCase

  alias Acs.AppMall

  @valid_attrs %{title: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AppMall.changeset(%AppMall{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AppMall.changeset(%AppMall{}, @invalid_attrs)
    refute changeset.valid?
  end
end
