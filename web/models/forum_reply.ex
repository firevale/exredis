defmodule Acs.ForumReply do
  use Acs.Web, :model

  schema "forums_replys" do
    field :content, :string

    belongs_to :post, Acs.ForumPost
    belongs_to :user, Acs.User, type: :integer

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:content])
    |> validate_required([:content])
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:post_id)
  end
end
