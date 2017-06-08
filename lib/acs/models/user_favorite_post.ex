defmodule Acs.UserFavoritePost do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:__meta__]}

  schema "user_favorite_posts" do

    belongs_to :user, Acs.User, type: :integer
    belongs_to :post, Acs.ForumPost, type: :integer

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:post_id, :user_id])
    |> validate_required([:post_id, :user_id])
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:post_id)
  end
end
