defmodule Acs.LoginCodes.AppLoginCode do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.LoginCodes.AppLoginCode

  @derive {Poison.Encoder, except: [:user, :app, :__meta__]}
  schema "app_login_codes" do
    field :code, :string
    field :owner, :string

    field :assigned_at, :utc_datetime
    field :used_at, :utc_datetime

    belongs_to :app, Acs.Apps.App, type: :string
    belongs_to :user, Acs.Accounts.User, type: :integer

    timestamps()
  end

  @doc false
  def changeset(%AppLoginCode{} = app_login_code, attrs) do
    app_login_code
    |> cast(attrs, [:code, :owner, :assigned_at, :used_at, :app_id, :user_id])
    |> validate_required([:app_id, :code])
    |> unique_constraint(:code, name: :app_login_codes_app_id_code_index)
  end
end
