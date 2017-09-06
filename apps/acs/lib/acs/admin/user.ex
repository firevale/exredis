defmodule Acs.Admin.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "admin_users" do
    field :account_id, :string
    field :active, :boolean, default: true
    field :admin_level, :integer, default: 0

    belongs_to :app, Acs.Apps.App, type: :string
    belongs_to :user, Acs.Accounts.User, type: :integer

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%Acs.Admin.User{} = user, attrs) do
    user
    |> cast(attrs, [:account_id, :active, :admin_level, :app_id, :user_id])
    |> validate_required([:account_id, :user_id])
    |> validate_format(:account_id, ~r/[^@]+@firevale\.com/)
    |> foreign_key_constraint(:user_id)
  end
end
