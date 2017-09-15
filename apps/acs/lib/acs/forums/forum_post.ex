defmodule Acs.Forums.ForumPost do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Forums.ForumPost

  @derive {Poison.Encoder, except: [:forum, :section, :user, :comments, :__meta__]}
  schema "forums_posts" do
    field :title, :string
    field :content, :binary
    field :is_top, :boolean, default: false
    field :is_hot, :boolean, default: false
    field :is_vote, :boolean, default: false
    field :reads, :integer, default: 0
    field :comms, :integer, default: 0   #回复数
    field :last_reply_at, :utc_datetime
    field :active, :boolean, default: true
    field :has_pic, :boolean, default: false

    belongs_to :forum, Acs.Forums.Forum, type: :string
    belongs_to :section, Acs.Forums.ForumSection, type: :integer
    belongs_to :user, Acs.Accounts.User
    belongs_to :editer, Acs.Accounts.User
    has_many   :comments, Acs.Forums.ForumComment, foreign_key: :post_id

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%ForumPost{} = forum_post, attrs) do
    forum_post
    |> cast(attrs, [:title, :content, :is_top, :is_hot, :is_vote, :reads, :comms, :active, :has_pic, :last_reply_at, :forum_id, :section_id, :editer_id, :user_id])
    |> validate_required([:title, :content, :active, :forum_id, :section_id, :user_id])
    |> foreign_key_constraint(:forum_id)
    |> foreign_key_constraint(:section_id)
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:editer_id)
  end
end
