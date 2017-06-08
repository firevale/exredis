defmodule Acs.Web.QuestionTest do
  use Acs.Web.ModelCase

  alias Acs.Question

  @valid_attrs %{title: "title", answer: "answer", is_hot: false, active: true,
                sort_index: 1, user_id: 100001, app_id: "978A7D84040FE589ED0C76295131E43D"}
  @invalid_attrs %{title: "title", answer: "answer", is_hot: false, active: true,
                sort_index: 1}

  test "changeset with valid attributes" do
    changeset = Question.changeset(%Question{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Question.changeset(%Question{}, @invalid_attrs)
    refute changeset.valid?
  end
end
