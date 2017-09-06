defmodule Acs.Apps.AppNews do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Apps.AppNews

  @derive {Poison.Encoder, except: [:forum, :user, :__meta__]}

  schema "app_news" do
    field :title, :string
    field :content, :binary
    field :group, :string
    field :is_top, :boolean, default: false
    field :pic, :string
    field :reads, :integer, default: 0
    field :active, :boolean, default: false

    belongs_to :app, Acs.Apps.App, type: :string
    belongs_to :user, Acs.Accounts.User, type: :integer

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%AppNews{} = app_news, attrs) do
    app_news
    |> cast(attrs, [:title, :content, :group, :is_top, :pic, :reads, :app_id, :user_id, :active])
    |> validate_required([:title, :content, :group, :app_id, :user_id, :active])
    |> foreign_key_constraint(:app_id)
    |> foreign_key_constraint(:user_id)
  end
end
