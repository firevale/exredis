defmodule Acs.ForumComment do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:post, :user, :__meta__]}

  schema "forums_comments" do
    field :content, :binary
    field :active, :boolean, default: true

    belongs_to :post, Acs.ForumPost, type: :integer
    belongs_to :user, Acs.User, type: :integer
    belongs_to :editer, Acs.User, type: :integer

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:content, :active, :post_id, :user_id, :editer_id])
    |> validate_required([:content, :active, :post_id, :user_id])
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:post_id)
    |> foreign_key_constraint(:editer_id)
  end
end
