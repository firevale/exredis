defmodule Acs.PMalls.RedeemCode do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.PMalls.RedeemCode

  schema "pmall_redeem_codes" do
    field :code, :string
    field :code_type, :string
    field :assigned_at, :utc_datetime
    field :used_at, :utc_datetime

    belongs_to :app, Acs.Apps.App, type: :string
    belongs_to :user, Acs.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(%RedeemCode{} = redeem_code, attrs) do
    redeem_code
    |> cast(attrs, [:code, :code_type, :assigned_at, :used_at, :app_id, :user_id])
    |> validate_required([:code, :code_type, :app_id])
  end
end
