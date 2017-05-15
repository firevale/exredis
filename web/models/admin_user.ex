defmodule Acs.AdminUser do
  use Acs.Web, :model

  schema "admin_users" do
    field :account_id, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:account_id])
    |> validate_required([:account_id])
    |> validate_format(:account_id, ~r/[^@]+@firevale\.com/)
  end
end
