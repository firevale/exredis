defmodule Acs.ForumManager do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:forum, :user, :__meta__]}

  schema "forums_managers" do
    field :logins, :integer
    field :created_at, :naive_datetime

    belongs_to :forum, Acs.Forum
    belongs_to :user, Acs.User, type: :integer

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:logins, :created_at, :forum_id, :user_id])
    |> validate_required([:logins, :created_at, :forum_id, :user_id])
    |> foreign_key_constraint(:forum_id)
    |> foreign_key_constraint(:user_id)
  end
end
