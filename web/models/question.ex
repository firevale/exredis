defmodule Acs.Question do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:app,  :__meta__]}
  
  schema "questions" do
    field :title, :string
    field :answer, :string
    field :is_hot, :boolean, default: false
    field :active, :boolean, default: true
    field :sort_index, :integer, default: 0
    field :reply_at, :utc_datetime
    field :platform, :string

    belongs_to :user, Acs.User, type: :integer
    belongs_to :app, Acs.App, type: :string
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :answer, :is_hot, :active, :sort_index, :reply_at, :platform, :user_id, :app_id])
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:app_id)
  end
end
