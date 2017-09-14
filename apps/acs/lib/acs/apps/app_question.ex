defmodule Acs.Apps.AppQuestion do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Apps.AppQuestion

  @derive {Poison.Encoder, except: [:app, :user,  :__meta__]}

  schema "app_questions" do
    field :title, :string
    field :answer, :string
    field :is_hot, :boolean, default: false
    field :active, :boolean, default: true
    field :sort_index, :integer, default: 0
    field :reply_at, :utc_datetime
    field :platform, :string

    belongs_to :user, Acs.Accounts.User
    belongs_to :app, Acs.Apps.App, type: :string

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%AppQuestion{} = app_question, attrs) do
    app_question
    |> cast(attrs, [:title, :answer, :is_hot, :active, :sort_index, :reply_at, :platform, :user_id, :app_id])
    |> validate_required([:title, :app_id, :user_id])
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:app_id)
  end
end
