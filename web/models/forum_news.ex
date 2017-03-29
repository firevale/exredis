defmodule Acs.ForumNews do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:forum, :user, :__meta__]}

  schema "forums_news" do
    field :title, :string
    field :content, :binary
    field :group, :string
    field :is_top, :boolean, default: false
    field :pic, :string
    field :reads, :integer, default: 0

    belongs_to :forum, Acs.Forum, type: :integer
    belongs_to :user, Acs.User, type: :integer

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :content, :group, :is_top, :pic, :reads, :forum_id, :user_id])
    |> validate_required([:title, :content, :group, :forum_id, :user_id])
    |> foreign_key_constraint(:forum_id)
    |> foreign_key_constraint(:user_id)
  end
end
