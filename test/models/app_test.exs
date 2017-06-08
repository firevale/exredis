defmodule Acs.Web.AppTest do
  use Acs.Web.ModelCase

  alias Acs.App
  alias Utils

  @valid_attrs %{
    id: Utils.generate_token(),
    name: "some content",
    payment_callback: "some content",
    secret: "some content",
    currency: "CNY"
  }
  @invalid_attrs %{
    any: :invalid
  }

  test "changeset with valid attributes" do
    changeset = App.changeset(%App{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = App.changeset(%App{}, @invalid_attrs)
    refute changeset.valid?
  end
end
