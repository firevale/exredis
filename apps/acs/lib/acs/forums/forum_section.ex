defmodule Acs.Forums.ForumSection do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Forums.ForumSection


  schema "forums_sections" do

    timestamps()
  end

  @doc false
  def changeset(%ForumSection{} = forum_section, attrs) do
    forum_section
    |> cast(attrs, [])
    |> validate_required([])
  end
end
