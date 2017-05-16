defmodule Acs.AdminUser do
  use Acs.Web, :model

  schema "admin_users" do
    field :account_id, :string
    field :active, :boolean, default: true
    field :admin_level, :integer, default: 0

    belongs_to :app, Acs.App, type: :string
    belongs_to :user, Acs.User, type: :integer
    
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:account_id, :active, :admin_level, :app_id, :user_id])
    |> validate_required([:account_id, :user_id])
    |> validate_format(:account_id, ~r/[^@]+@firevale\.com/)
    |> foreign_key_constraint(:user_id)
  end
end
