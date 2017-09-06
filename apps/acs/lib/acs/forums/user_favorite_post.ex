defmodule Acs.Forums.UserFavoritePost do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Forums.UserFavoritePost


  schema "forums_user_favorite_posts" do

    timestamps()
  end

  @doc false
  def changeset(%UserFavoritePost{} = user_favorite_post, attrs) do
    user_favorite_post
    |> cast(attrs, [])
    |> validate_required([])
  end
end
