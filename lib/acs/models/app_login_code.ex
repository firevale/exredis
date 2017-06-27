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
    |> cast(params, [:code, :owner, :assigned_at, :used_at, :app_id, :user_id])
    |> validate_required([:app_id, :code])
    |> unique_constraint(:code, name: :app_login_codes_app_id_code_index)
  end
end
