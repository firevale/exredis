defmodule Acs.Web.AppNewsTest do
  use Acs.Web.ModelCase

  alias Acs.AppNews

  @valid_attrs %{title: "some content", content: "content", group: "group", app_id: "978A7D84040FE589ED0C76295131E43D", 
                  user_id: 10002, active: true}
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
