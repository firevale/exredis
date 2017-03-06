defmodule Acs.ForumReply do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:post, :user, :__meta__]}

  schema "forums_replys" do
    field :content, :string
    field :created_at, :naive_datetime

    belongs_to :post, Acs.ForumPost, type: :integer
    belongs_to :user, Acs.User, type: :integer

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:content, :created_at, :post_id, :user_id])
    |> validate_required([:content, :created_at, :post_id, :user_id])
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:post_id)
  end
end
