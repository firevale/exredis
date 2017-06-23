defmodule Acs.AppLoginCode do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:user, :app, :__meta__]}

  schema "app_login_codes" do
    field :code, :string
    field :owner, :string

    field :assigned_at, :utc_datetime
    field :used_at, :utc_datetime

    belongs_to :app, Acs.App, type: :string
    belongs_to :user, Acs.User, type: :integer

    timestamps()
  end

  use Utils.Jsonable

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:code, :owner])
    |> validate_required([:code])
  end
end
