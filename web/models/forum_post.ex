defmodule Acs.ForumPost do
  use Acs.Web, :model

  schema "forums_posts" do
    field :title, :string
    field :content, :string
    field :is_top, :boolean, default: false
    field :is_hot, :boolean, default: false
    field :is_vote, :boolean, default: false
    field :reads, :integer, default: 0
    field :replys, :integer, default: 0
    field :created_at, :naive_datetime
    field :last_reply_at, :naive_datetime

    belongs_to :section, Acs.ForumSection, type: :integer
    belongs_to :user, Acs.User, type: :integer

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :content, :is_top, :is_hot, :is_vote, :reads, :replys, :created_at, :last_reply_at, :section_id, :user_id])
    |> validate_required([:title, :content, :is_top, :is_hot, :is_vote, :reads, :replys, :created_at, :last_reply_at, :section_id, :user_id])
    |> foreign_key_constraint(:section_id)
    |> foreign_key_constraint(:user_id)
  end
end
