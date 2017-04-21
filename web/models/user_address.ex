defmodule Acs.UserAddress do
  use Acs.Web, :model

  schema "user_address" do
    field :name, :string
    field :mobile, :string
    field :area, :string
    field :address, :string
    field :area_code, :string
    field :is_default, :boolean, default: false

    belongs_to :user, Acs.User, type: :integer

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :mobile, :area, :address, :area_code, :is_default, :user_id])
    |> validate_required([:name, :mobile, :area, :address, :area_code])
    |> foreign_key_constraint(:user_id)
    |> validate_format(:mobile, ~r/^1\d+$/)
  end
end
