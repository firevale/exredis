defmodule Acs.Forums.ForumManager do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Forums.ForumManager


  @derive {Poison.Encoder, except: [:forum, :user, :__meta__]}
  schema "forums_managers" do
    belongs_to :forum, Acs.Forums.Forum
    belongs_to :user, Acs.Accounts.User
    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%ForumManager{} = forum_manager, attrs) do
    forum_manager
    |> cast(attrs, [:forum_id, :user_id])
    |> validate_required([:forum_id, :user_id])
    |> foreign_key_constraint(:forum_id)
    |> foreign_key_constraint(:user_id)
  end
end
