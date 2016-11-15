defmodule Acs.AppTest do
  use Acs.ModelCase

  alias Acs.App

  @valid_attrs %{name: "some content", payment_callback: "some content", secret: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = App.changeset(%App{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = App.changeset(%App{}, @invalid_attrs)
    refute changeset.valid?
  end
end
