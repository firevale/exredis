defmodule Acs.AppNewsTest do
  use Acs.ModelCase

  alias Acs.AppNews

  @valid_attrs %{title: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AppNews.changeset(%AppNews{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AppNews.changeset(%AppNews{}, @invalid_attrs)
    refute changeset.valid?
  end
end
