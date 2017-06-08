defmodule Acs.AppNews do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:forum, :user, :__meta__]}

  schema "app_news" do
    field :title, :string
    field :content, :binary
    field :group, :string
    field :is_top, :boolean, default: false
    field :pic, :string
    field :reads, :integer, default: 0
    field :active, :boolean, default: false

    belongs_to :app, Acs.App, type: :string
    belongs_to :user, Acs.User, type: :integer

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :content, :group, :is_top, :pic, :reads, :app_id, :user_id, :active])
    |> validate_required([:title, :content, :group, :app_id, :user_id, :active])
    |> foreign_key_constraint(:app_id)
    |> foreign_key_constraint(:user_id)
  end
end
