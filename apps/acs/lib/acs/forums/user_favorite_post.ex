defmodule Acs.Forums.UserFavoritePost do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Forums.UserFavoritePost

  @derive {Poison.Encoder, except: [:__meta__]}
  schema "forums_user_favorite_posts" do
    belongs_to :user, Acs.Accounts.User
    belongs_to :post, Acs.Forums.ForumPost, type: :integer
    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%UserFavoritePost{} = user_favorite_post, attrs) do
    user_favorite_post
    |> cast(attrs, [:post_id, :user_id])
    |> validate_required([:post_id, :user_id])
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:post_id)
  end
end
