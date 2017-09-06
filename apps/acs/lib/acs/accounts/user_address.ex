defmodule Acs.Accounts.UserAddress do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Accounts.UserAddress

  schema "user_addresses" do
    field :name, :string
    field :mobile, :string
    field :area, :string
    field :address, :string
    field :area_code, :string
    field :is_default, :boolean, default: false

    belongs_to :user, Acs.Accounts.User, type: :integer

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%UserAddress{} = user_address, attrs) do
    user_address
    |> cast(attrs, [:name, :mobile, :area, :address, :area_code, :is_default, :user_id])
    |> validate_required([:name, :mobile, :area, :address, :area_code])
    |> foreign_key_constraint(:user_id)
    |> validate_format(:mobile, ~r/^0?(13|14|15|17|18)[0-9]{9}+$/)
  end
end
