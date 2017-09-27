defmodule Acs.PMalls.Cdkey do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.PMalls.Cdkey

  schema "pmall_cdkeys" do
    field :code, :string
    field :code_type, :string
    field :assigned_at, :utc_datetime
    field :used_at, :utc_datetime

    belongs_to :app, Acs.Apps.App, type: :string
    belongs_to :owner, Acs.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(%Cdkey{} = cdkey, attrs) do
    cdkey
    |> cast(attrs, [:code, :code_type, :assigned_at, :used_at, :app_id, :owner_id])
    |> validate_required([:code, :code_type, :app_id])
  end
end
