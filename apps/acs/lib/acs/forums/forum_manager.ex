defmodule Acs.Forums.ForumManager do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Forums.ForumManager


  schema "forums_managers" do

    timestamps()
  end

  @doc false
  def changeset(%ForumManager{} = forum_manager, attrs) do
    forum_manager
    |> cast(attrs, [])
    |> validate_required([])
  end
end
