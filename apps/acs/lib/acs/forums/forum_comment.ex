defmodule Acs.Forums.ForumComment do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Forums.ForumComment

  @derive {Poison.Encoder, except: [:post, :user, :__meta__]}
  schema "forums_comments" do
    field :content, :binary
    field :active, :boolean, default: true
    field :floor, :integer

    belongs_to :post, Acs.Forums.ForumPost, type: :integer
    belongs_to :user, Acs.Accounts.User
    belongs_to :editer, Acs.Accounts.User

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%ForumComment{} = forum_comment, attrs) do
    forum_comment
    |> cast(attrs, [:content, :active, :floor, :post_id, :user_id, :editer_id])
    |> validate_required([:content, :active, :post_id, :user_id])
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:post_id)
    |> foreign_key_constraint(:editer_id)
  end
end
