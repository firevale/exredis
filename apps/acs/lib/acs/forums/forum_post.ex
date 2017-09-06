defmodule Acs.Forums.ForumPost do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Forums.ForumPost


  schema "forums_posts" do

    timestamps()
  end

  @doc false
  def changeset(%ForumPost{} = forum_post, attrs) do
    forum_post
    |> cast(attrs, [])
    |> validate_required([])
  end
end
